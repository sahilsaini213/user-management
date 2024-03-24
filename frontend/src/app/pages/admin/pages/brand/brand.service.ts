import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { IImage } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';
import { deleteBrand, getBrand, getBrands, saveBrand } from 'src/mock-data/brands_data';

export interface IBrand {
  id?: number,
  name?: string,
  image?: IImage,
}

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService<IBrand> {
 
  basePath: 'admin/brand';

  constructor(public http: HttpClient) {
    super(http);
  }
  
  getList(query?: any): Observable<ITableList<IBrand>> {
    return getBrands(query);
  }

  getById(id: string): Observable<IBrand> {
    return getBrand(id);
  }

  createNew(data: Partial<IBrand>): Observable<any> {
    return saveBrand(data);
  }

  updateById(data: Partial<IBrand>, id: any): Observable<any> {
    return saveBrand(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteBrand(id);
  }

}
