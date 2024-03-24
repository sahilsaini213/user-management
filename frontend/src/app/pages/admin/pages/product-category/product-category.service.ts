import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { environment } from 'src/environments/environment';
import { deleteCategory, getCategories, getCategory, saveCategory } from 'src/mock-data/products/product_category';

export interface ISubCategory {
  id?: string,
  name: string
}

export interface ICategory {
  id?: string,
  name?: string,
  message?: string
  sub_categories?: ISubCategory[],
}

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends BaseService<ICategory> {
  basePath: string;

  constructor(public http: HttpClient) {
    super(http);
  }


  getList(query?: any): Observable<ITableList<ICategory>> {
    return getCategories(query);
  }

  getById(id: string): Observable<ICategory> {
    return getCategory(id);
  }

  createNew(data: Partial<ICategory>): Observable<any> {
    return saveCategory(data);
  }

  updateById(data: Partial<ICategory>, id: any): Observable<any> {
    return saveCategory(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteCategory(id);
  }

}
