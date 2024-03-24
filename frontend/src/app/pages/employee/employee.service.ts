import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMe, QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { QAvatar } from 'src/app/modules/ui-kit/components/q-avatar/q-avatar.component';
import { RouteService } from 'src/app/service/route.service';
import { StringUtil } from 'src/app/utils/string.utils';
import { environment } from 'src/environments/environment';
import { STORAGE_KEY_SELECTED_WAREHOUSE } from 'src/mock-data/warehouse-management/warehouse-data';
import { IWarehouse } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _defaultWarehouse: IWarehouse | null;
  defaultWarehouseSelected$ = new BehaviorSubject<IWarehouse|null>(null);
  constructor( 
    private http: HttpClient,
    private authService: QAuthService,
    private routeService: RouteService
  ) { }

  async hasWarehouse(): Promise<boolean> {
    const warehouses = await this.getWarehouses();
    return warehouses && warehouses.length ? true : false;
  }

  async getWarehouses(): Promise<IWarehouse[]> {
    const response:IMe = await this.authService.me();
    return response.warehouses;
  }

  setOrChooseDefaultWarehouse(warehouses: IWarehouse[], warehouseId?: number) {
    if(warehouseId && warehouses?.length){
      const warehouse = warehouses.find((warehouse: IWarehouse) => Number(warehouse.id) === Number(warehouseId));
      if(warehouse){
        this.setDefaultWarehouse(warehouse, false);
        this.defaultWarehouseSelected$.next(this._defaultWarehouse);
      }else{
        this.setDefaultWarehouse(warehouses[0]);
      }
    } else if(warehouses?.length) {
      this.setDefaultWarehouse(warehouses[0]);
    } else {
      this.routeService.navigateWithPreserve(`app/warehouse-info`);
    }
  }
  
  setDefaultWarehouse(warehouse: IWarehouse, redirect: boolean = true) {
    this._defaultWarehouse = warehouse;
    if(environment.dummy) {
      localStorage.setItem(STORAGE_KEY_SELECTED_WAREHOUSE, this._defaultWarehouse.id);
    }
    if(redirect)this.routeService.navigateWithPreserve(`app/${this._defaultWarehouse.id}/dashboard`);
  }

  getDefaultWarehouse() {
    return this._defaultWarehouse;
  }

  getWarehouseAvatar(warehouse: IWarehouse) {
    const avatar: QAvatar = {};
    if (warehouse.image) {
      avatar.url = warehouse.image.url;
    } else {
      avatar.label = StringUtil.avatarLabel(warehouse.name);
    }
    return avatar;
  }

}
