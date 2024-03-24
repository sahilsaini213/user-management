import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { QThemeConfig } from '.';
import { QThemeService } from './q-theme.service';

@Component({
    selector: 'q-theme',
    templateUrl: './q-theme.component.html'
})
export class QThemeComponent implements OnInit, OnDestroy {
    @Output() toggleMenu = new EventEmitter();
    @Output() configClick = new EventEmitter();
    scale: number;
    scales: any[] = [12, 13, 14, 15, 16];
    config: QThemeConfig;
    menuActive = false;
    subscription: Subscription;

    constructor(public qThemeService: QThemeService, public primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.config = this.qThemeService.config;
        this.scale = Number(document.documentElement.style.fontSize.replace('px', ''));
        this.subscription = this.qThemeService.configUpdate$.subscribe(config => {
            this.config = config;
            this.applyScale();
        });
    }

    changeMenuMode() {
        this.qThemeService.updateConfig(this.config);
    }

    onConfigClick(event) {
        this.configClick.emit(event);
    }

    onConfigButtonClick(event) {
        this.menuActive = !this.menuActive;
        event.preventDefault();
        this.toggleMenu.emit(this.menuActive);
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    onRippleChange(ripple) {
        this.primengConfig.ripple = ripple;
        this.qThemeService.updateConfig({...this.config, ...{ripple}});
    }

    onInputStyleChange() {
        this.qThemeService.updateConfig(this.config);
    }

    changeTheme(dark:boolean) {
        // Template Provided Themes
        let themeElement = document.getElementById('theme-css');
        const href = themeElement.getAttribute('href');
        const activeTheme = dark ? 'dark' : 'light';
        const theme = this.config.theme.replace('light', activeTheme).replace('dark', activeTheme);
        themeElement.setAttribute('href', href.replace(this.config.theme, theme));
        // Hwims Theme
        let qthemeElement = document.getElementById('custom-theme-css');
        qthemeElement.setAttribute('href', `assets/theme/hss-theme/h-theme-${activeTheme}.css`);

        this.qThemeService.updateConfig({...this.config, theme, dark});
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}