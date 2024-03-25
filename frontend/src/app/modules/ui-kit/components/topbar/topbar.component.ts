
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { RouteService } from 'src/app/service/route.service';
import { DialogService } from 'src/app/service/dialog.service';
import { IUser } from 'src/app/modules/q-auth/q-auth-model';
import { QAvatar } from '../q-avatar/q-avatar.component';
import { UserType } from 'src/app/consts/app.const';

export interface TopbarData {
  items: MenuItem[],
  profileItems: any[]
}

@Component({
  selector: 'q-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  providers: [DialogService, MessageService]
})
export class TopbarComponent implements OnInit, OnChanges {

  @Input() hideSideMenuButton = false;
  @Input() parentRef: any = {};
  @Input() navbar: TopbarData;
  @Input() userType: UserType = UserType.EMPLOYEE;
  user: IUser;
  topBarNavAvatar: QAvatar;
  defaultWarehouse: any;

  defaultProfileItems: MenuItem[] = [
    {
      label: ``,
      items: [
        {
          label: 'Personal Settings',
          routerLink: 'personal/profile'
        },
        {
          label: 'Logout',
          icon:'pi pi-sign-out',
          command: this.logout.bind(this)
        }
      ]
    }
  ]

  navbarData: TopbarData = {
    items: [],
    profileItems: []
  }

  constructor(
    private qAuthService: QAuthService,
    public routeService: RouteService,
  ) { }

  async ngOnInit() {
    const {user} = await this.qAuthService.me();
    this.user = user;
    if(user.type === UserType.EMPLOYEE) {
      this.setAvatar();
    }
  }

  setAvatar() {
    let avatar: QAvatar = {};
      avatar = this.qAuthService.getUserAvatar(this.user);
    this.topBarNavAvatar = avatar;
  }

  ngOnChanges(changes: any): void {
    this.navbarData.profileItems = [];
    const profileItems = this.navbar?.profileItems || [];
    this.navbarData.profileItems = [...profileItems, ...this.defaultProfileItems];
  }

  logout() {
    this.qAuthService.logout(() => {
      this.routeService.navigateByURL('auth/signin');
    });
  }

  onMenuItemClick({option}) {
    if (option?.command) {
      option.command();
    } if (option?.routerLink) {
     
        this.routeService.navigateByURL(option.routerLink);
      }
    }
  }