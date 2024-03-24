import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { toRequestParams } from 'src/app/utils/request.utils';
import { environment } from 'src/environments/environment';
import { getSale, getSales, saveSale } from 'src/mock-data/sale/sale_list';
import { getPaymentItem, savePayment } from 'src/mock-data/transfer/view_payment_data';

export interface ISale {
  date?: string,
  reference?: string,
  product?: string,
  product_id?: number,
  supplier?: string,
  supplier_id?: number,
  warehouse?: string,
  warehouse_id?: number,
  status?: string,
  status_id?: number,
  customer?: string,
  payment_status?: string,
  payment_status_id?: number,
  grand_total?: number,
  paid?: number,
  due?: number,
}

@Injectable({
  providedIn: 'root'
})
export class SaleService extends BaseService<ISale> {
  

  basePath = 'sale';

  constructor(public http: HttpClient) {
    super(http);
   }

   getList(query?: any): Observable<ITableList<ISale>> {
    return getSales(query);
  }

  getById(id: string): Observable<ISale> {
    return getSale(id);
  }

  createNew(data: Partial<ISale>): Observable<any> {
    return saveSale(data);
  }

  updateById(data: Partial<ISale>, id: any): Observable<any> {
    return saveSale(data, id);
  }

  deleteById(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  findPaymentById(ref: string) {
    if (environment.dummy) {
      return getPaymentItem(ref);
    } else {
      return this.http.get(`payments/${ref}`)
    }
  }

  savePayment(data, reference) {
    if (environment.dummy) {
      return savePayment(data, reference);
    } else {
      return this.http[reference ? 'put' : 'post'](`sales/payments/`, data)
    }
  }
}
