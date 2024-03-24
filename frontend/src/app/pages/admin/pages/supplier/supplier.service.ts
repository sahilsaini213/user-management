import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { deleteSupplier, getSupplier, saveSupplier, getSuppliers } from 'src/mock-data/supplier/supplier_data';

export interface ISupplier {
  id?: number,
  code?: string,
  name?: string,
  phone_number?: string,
  country_id?: string,
  company?: string,
  email?: string,
  address?: string,
  country?: string,
  city?: string;
  zipcode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseService<ISupplier> {

  basePath = 'admins/suppliers';
  
  constructor(public http: HttpClient) {
    super(http);
   }

   getList(query?: any): Observable<ITableList<ISupplier>> {
    return getSuppliers(query);
  }

  getById(id: string): Observable<ISupplier> {
    return getSupplier(id);
  }

  createNew(data: Partial<ISupplier>): Observable<any> {
    return saveSupplier(data);
  }

  updateById(data: Partial<ISupplier>, id: any): Observable<any> {
    return saveSupplier(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteSupplier(id);
  }
}
