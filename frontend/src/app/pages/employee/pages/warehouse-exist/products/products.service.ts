import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { IImage } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';
import { environment } from 'src/environments/environment';
import { getProduct, getProducts, saveProduct, deleteProduct } from '../../../../../../mock-data/products/products_data';
import { getUnits } from './product.const';

export interface IProduct {
  id?: string,
  images?: IImage[],
  name?: string,
  code?: string,
  origin_country_id?: string,
  origin_country?: string,
  category_id?: string,
  category?: string,
  sub_category_id?: string,
  sub_category?: string,
  brand_id?: string,
  brand?: string,
  unit_id?: string,
  unit?: string,
  variant?: string,
  stock?: string,
  price_per_unit?: string,
  price_difference?: string,
  warehouse_id?: string,
  warehouse?: string,
  different_price?: string,
  date_expired?: string,
  promotional_sale?: string,
  multi_variant?: string,
  imei_code?: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<IProduct> {
  basePath = 'products';

  constructor(public http: HttpClient) {
    super(http);
  }


  getList(query?: any): Observable<ITableList<IProduct>> {
    return getProducts(query);
  }

  getById(id: string): Observable<IProduct> {
    return getProduct(id);
  }

  createNew(data: Partial<IProduct>): Observable<any> {
    return saveProduct(data);
  }

  updateById(data: Partial<IProduct>, id: any): Observable<any> {
    return saveProduct(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteProduct(id);
  }
  getUnits() {
    if (environment.dummy) {
      return getUnits();
    } else {
      return this.http.get(`products/units`);
    }
  }
}
