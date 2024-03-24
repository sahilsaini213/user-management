import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { getTransferItem, getTransferList, saveTransferItem } from 'src/mock-data/transfer/product_transfer_data';

export interface IProductTransfer {
  date?: string,
  reference?: string,
  product?: string,
  product_id?: number,
  from_warehouse?: string,
  from_warehouse_id?: number,
  status?: string,
  status_id?: number,
  to_warehouse?: string,
  to_warehouse_id?: number,
  payment_status?: string,
  payment_status_id?: number,
  grand_total?: number,
  paid?: number,
  due?: number,
}

@Injectable({
  providedIn: 'root'
})
export class TransferService extends BaseService<IProductTransfer> {
  

  basePath = 'transfer';

  constructor(public http: HttpClient) {
    super(http);
   }

   getList(query?: any): Observable<ITableList<IProductTransfer>> {
    return getTransferList(query);
  }

  getById(id: string): Observable<IProductTransfer> {
    return getTransferItem(id);
  }

  createNew(data: Partial<IProductTransfer>): Observable<any> {
    return saveTransferItem(data);
  }

  updateById(data: Partial<IProductTransfer>, id: any): Observable<any> {
    return saveTransferItem(data, id);
  }

  deleteById(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

}