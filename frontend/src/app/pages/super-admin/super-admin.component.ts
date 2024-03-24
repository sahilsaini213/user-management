import { Component, AfterViewInit, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { QThemeService } from '../../modules/q-theme/q-theme.service';
import { SUPER_ADMIN_MENU_DATA } from './super-admin.const';
import { BaseDashboard } from 'src/app/classes/base-dashboard';
import { TopbarData } from 'src/app/modules/ui-kit/components/topbar/topbar.component';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { UserType } from 'src/app/consts/app.const';

@Component({
    selector: 'app-super-admin',
    templateUrl: './super-admin.component.html',
    styleUrls: ['./super-admin.component.scss'],
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
  export class SuperAdminComponent extends BaseDashboard implements AfterViewInit, OnDestroy, OnInit {
    menuData = [];
    navbar: TopbarData;
    userType = UserType.SUPER_ADMIN;
    constructor(public renderer: Renderer2, 
        public qThemeService: QThemeService,
        public auth: QAuthService
        ) { 
        super(renderer, qThemeService, auth);
    }

    ngOnInit(): void {
        this.onInit();
    }

    async loadMenuData() {
        this.menuData = SUPER_ADMIN_MENU_DATA;
        this.navbar = {items: [], profileItems: []};
    }

    ngAfterViewInit(): void {
        this.afterViewInit();
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    
}
