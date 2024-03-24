import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BaseDashboard } from 'src/app/classes/base-dashboard';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'src/app/service/dialog.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { TopbarData } from 'src/app/modules/ui-kit/components/topbar/topbar.component';
import { takeWhile } from 'rxjs';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { EmployeeService } from '../../employee.service';
import { IWarehouse } from '../../employee.model';
import { MENU_DATA, NAVBAR_DATA } from '../../employee.const';
import { deepCopy } from '@firebase/util';

@Component({
  selector: 'app-warehouse-exist',
  templateUrl: './warehouse-exist.component.html',
  styleUrls: ['./warehouse-exist.component.scss'],
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
export class WarehouseExistComponent extends BaseDashboard implements AfterViewInit, OnDestroy, OnInit {

  menuData = [];
  navbar: TopbarData = {
    items: [],
    profileItems: []
  };
  hasWarehouse = true;
  dialogRef: DynamicDialogRef;

  constructor(
    public renderer: Renderer2,
    public qThemeService: QThemeService,
    public qAuthService: QAuthService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public employeeService: EmployeeService
  ) {
    super(renderer, qThemeService, qAuthService);
  }

  ngOnInit() {
    super.onInit();
    this.employeeService.defaultWarehouseSelected$
      .pipe(takeWhile(() => !this.isDestroy))
      .subscribe((warehouse: IWarehouse) => {
        if (warehouse) {
          this.setupWarehouseMenu(warehouse);
        }
      })
  }

  async loadMenuData() {
    this.setupWarehouseMenu();
  }

  setupWarehouseMenu(defaultWarehouse?) {
    this.qAuthService.me().then(({user, warehouses}) => {
      this.hasWarehouse = warehouses && warehouses.length ? true : false;
      if (this.hasWarehouse) {
        this.menuData = deepCopy(MENU_DATA).filter( module => {
          let permissions = user.permissions || {};
          if(module.id) {
            permissions = permissions[module.id];
          }
          module.items = module.items.filter( item => {
            return !module.id || !item['id'] || permissions[item['id']]?.selected;
          })
          return !module.id || permissions.view?.selected || permissions.add?.selected || permissions.edit?.selected;
        });
        this.navbar = NAVBAR_DATA(this);
        if (defaultWarehouse) {
          this.navbar.profileItems[0].items.unshift({
            label: defaultWarehouse.name,
            avatar: this.employeeService.getWarehouseAvatar(defaultWarehouse),
            activeWarehouse: true,
            disabled: true
          });
          if (warehouses.length > 1) {
            const bList = [];
            warehouses.forEach(warehouse => {
              if (warehouse.id !== defaultWarehouse.id) {
                bList.push({
                  items: [{
                    label: warehouse.name,
                    avatar: this.employeeService.getWarehouseAvatar(warehouse),
                    command: () => {
                      this.employeeService.setDefaultWarehouse(warehouse)
                    }
                  }]
                });
              }
            });
            this.navbar.profileItems.splice(1, null, ...bList);
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
