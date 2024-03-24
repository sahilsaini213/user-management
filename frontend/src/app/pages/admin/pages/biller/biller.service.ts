import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { deleteBiller, getBiller, getBillers, saveBiller } from 'src/mock-data/biller/biller_data';

export interface IBiller {
  id?: string,
  code?: string,
  name?: string,
  date?:string
  phone_number?: string,
  country_id?: string,
  company?: string,
  email?: string,
  address?: string,
  country?: string,
  warehouse?:string,
  warehouse_id?:string,
  city?: string;
  billercode?: string;
}


@Injectable({
  providedIn: 'root'
})
export class BillerService extends BaseService<IBiller>{
  basePath = 'admins/biller';
  constructor(public http: HttpClient) {
    super(http);
   }

   getList(query?: any): Observable<ITableList<IBiller>> {
    return getBillers(query);
  }

  getById(id: string): Observable<IBiller> {
    return getBiller(id);
  }

  createNew(data: Partial<IBiller>): Observable<any> {
    return saveBiller(data);
  }

  updateById(data: Partial<IBiller>, id: any): Observable<any> {
    return saveBiller(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteBiller(id);
  }

}
