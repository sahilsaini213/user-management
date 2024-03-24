import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { IWarehouse } from 'src/app/pages/employee/employee.model';
import { environment } from 'src/environments/environment';
import { deleteWarehouse, getWarehouse, getWarehouses, saveWarehouse, } from 'src/mock-data/warehouse-management/warehouse-data';
import { getCountries } from './warehouse.const';

@Injectable({
  providedIn: 'root'
})
export class WarehouseManagementService extends BaseService<IWarehouse> {
  basePath = 'admins/warehouse';

   constructor(public http: HttpClient) {
    super(http);
   }

   getList(query?: any): Observable<ITableList<IWarehouse>> {
    return getWarehouses(query);
  }

  getById(id: string): Observable<IWarehouse> {
    return getWarehouse(id);
  }

  createNew(data: Partial<IWarehouse>): Observable<any> {
    return saveWarehouse(data);
  }

  updateById(data: Partial<IWarehouse>, id: any): Observable<any> {
    return saveWarehouse(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteWarehouse(id);
  }

  countrylist() {
    if (environment.dummy) {
      return getCountries();
    }
    else {
      return this.http.get(`admin/warehouse/country`,)
    }
  }
}