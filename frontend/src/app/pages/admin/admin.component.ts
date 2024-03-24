import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDashboard } from 'src/app/classes/base-dashboard';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'src/app/service/dialog.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { TopbarData } from 'src/app/modules/ui-kit/components/topbar/topbar.component';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { AdminService } from './admin.service';
import { ADMIN_MENU_DATA } from './admin.const';
import { UserType } from 'src/app/consts/app.const';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
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
export class AdminComponent extends BaseDashboard implements AfterViewInit, OnDestroy, OnInit {

  menuData = [];
  navbar: TopbarData = {
    items: [],
    profileItems: []
  };
  userType = UserType.ADMIN;
  constructor(
    public renderer: Renderer2,
    public qThemeService: QThemeService,
    public qAuthService: QAuthService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public adminService: AdminService
  ) {
    super(renderer, qThemeService, qAuthService);
  }

  ngOnInit() {
    super.onInit();
  }

  async loadMenuData() {
    this.menuData = ADMIN_MENU_DATA;
    this.navbar = {items: [], profileItems: []};
  }

  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
