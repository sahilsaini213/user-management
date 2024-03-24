import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { delay, Observable, of } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { toRequestParams } from 'src/app/utils/request.utils';
import { environment } from 'src/environments/environment';
import { getstock, getStockList } from 'src/mock-data/stock-report/stock_report_data';
import { getWarehouses } from 'src/mock-data/warehouse-management/warehouse-data';

export interface IStockReport {
  date: string,
  warehouse?: string,
  warehouse_id?: number,
  product: string,
  unit?: string,
  opening_stock: number,
  received: number,
  total: number,
  sales: number,
  closing_stock: number,
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseService<IStockReport> {
  basePath = 'reports';

  constructor(public http: HttpClient) {
    super(http);
  }

  getList(query?: any): Observable<ITableList<IStockReport>> {
    return getStockList(query)
  }
  
  getstock(date, warehouseId) {
      return getstock(date, warehouseId)
  }

  getById(id: string): Observable<IStockReport> {
    throw new Error('Method not implemented.');
  }
  createNew(data: Partial<IStockReport>): Observable<any> {
    throw new Error('Method not implemented.');
  }
  updateById(data: Partial<IStockReport>, id: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
