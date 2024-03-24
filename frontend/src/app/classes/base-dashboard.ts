import { Renderer2 } from "@angular/core";
import { takeWhile } from "rxjs";
import { QAuthService } from "../modules/q-auth/q-auth.service";
import { QThemeConfig } from "../modules/q-theme";
import { QThemeService } from "../modules/q-theme/q-theme.service";

export abstract class BaseDashboard {

    public menuInactiveDesktop: boolean;

    public menuActiveMobile: boolean;

    public overlayMenuActive: boolean;

    public staticMenuInactive: boolean = false;

    public profileActive: boolean;

    public topMenuActive: boolean;

    public topMenuLeaving: boolean;

    public theme: string;

    documentClickListener: () => void;

    menuClick: boolean;

    topMenuButtonClick: boolean;

    configActive: boolean;

    configClick: boolean;

    config: QThemeConfig;

    isDestroy = false;
    abstract loadMenuData(): Promise<void>;

    constructor(public renderer: Renderer2,
        public qThemeService: QThemeService,
        public aAuthService: QAuthService
    ) { }

    onInit() {
        this.config = this.qThemeService.config;
        this.qThemeService.configUpdate$
            .pipe(takeWhile(() => !this.isDestroy))
            .subscribe(config => {
                this.config = config;
            });
        this.aAuthService.userAuthState$$
            .pipe(takeWhile(() => !this.isDestroy))
            .subscribe(() => {
                this.loadMenuData();
            });
        this.loadMenuData();
    }

    afterViewInit() {
        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.isDesktop()) {
                if (!this.menuClick) {
                    this.menuActiveMobile = false;
                }

                if (!this.topMenuButtonClick) {
                    this.hideTopMenu();
                }
            }
            else {
                if (!this.menuClick && this.qThemeService.isOverlay()) {
                    this.menuInactiveDesktop = true;
                }
                if (!this.menuClick) {
                    this.overlayMenuActive = false;
                }
            }

            if (this.configActive && !this.configClick) {
                this.configActive = false;
            }

            this.configClick = false;
            this.menuClick = false;
            this.topMenuButtonClick = false;
        });
    }

    toggleMenu(event: Event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.qThemeService.isOverlay()) {
                if (this.menuActiveMobile === true) {
                    this.overlayMenuActive = true;
                }

                this.overlayMenuActive = !this.overlayMenuActive;
                this.menuActiveMobile = false;
            }
            else if (this.qThemeService.isStatic()) {
                this.staticMenuInactive = !this.staticMenuInactive;
            }
        }
        else {
            this.menuActiveMobile = !this.menuActiveMobile;
            this.topMenuActive = false;
        }
        event.preventDefault ? event.preventDefault() : '';
    }

    closeSideMenu() {
        this.overlayMenuActive = false;
        this.menuActiveMobile = false;
        this.topMenuActive = false;
        this.staticMenuInactive = true;
    }

    isOverlay() {
        return this.qThemeService.isOverlay();
    }

    isStatic() {
        return this.qThemeService.isStatic();
    }

    toggleProfile(event: Event) {
        this.profileActive = !this.profileActive;
        event.preventDefault();
    }

    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = true;
        }

        event.preventDefault();
    }

    hideTopMenu() {
        this.topMenuLeaving = true;
        setTimeout(() => {
            this.topMenuActive = false;
            this.topMenuLeaving = false;
        }, 1);
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isDesktop() {
        return window.innerWidth > 992;
    }

    isMobile() {
        return window.innerWidth < 1024;
    }

    onSearchClick() {
        this.topMenuButtonClick = true;
    }

    destroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }

        this.isDestroy = false;
    }

}
