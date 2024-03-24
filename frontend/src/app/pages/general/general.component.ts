import { Component, AfterViewInit, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { QThemeService } from '../../modules/q-theme/q-theme.service';
import { BaseDashboard } from 'src/app/classes/base-dashboard';
import { TopbarData } from 'src/app/modules/ui-kit/components/topbar/topbar.component';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { UserType } from 'src/app/consts/app.const';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss'],
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
  })
  export class GeneralComponent extends BaseDashboard implements AfterViewInit, OnDestroy, OnInit {

    menuData = [];
    navbar: TopbarData;
    userType: UserType = UserType.EMPLOYEE;
    constructor(
        public renderer: Renderer2, 
        public qThemeService: QThemeService,
        public auth: QAuthService
    ) { 
        super(renderer, qThemeService, auth);
    }

    ngOnInit(): void {
        this.onInit();
    }

    async loadMenuData() {
        const isSuperAdmin = await this.auth.isSuperAdmin();
        const isAdmin = await this.auth.isAdmin();
        if(isSuperAdmin) {
            this.userType = UserType.SUPER_ADMIN;
        } else if(isAdmin) {
            this.userType = UserType.ADMIN;
        }
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
