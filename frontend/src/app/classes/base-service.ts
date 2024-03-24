import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITableList } from './base-list';

export abstract class BaseService<T> {
    abstract basePath: string;
    abstract getList(query?): Observable<ITableList<T>>;
    abstract getById(id: string): Observable<T>;
    abstract createNew(data: Partial<T>): Observable<any>;
    abstract updateById(data: Partial<T>, id): Observable<any>;
    abstract deleteById(id: string): Observable<any>;
    constructor(public http: HttpClient) { }
  
    list(query?): Observable<ITableList<T>> {
      if (environment.dummy) {
        return this.getList(query);
      } else {
        return this.http.get<ITableList<T>>(`${this.basePath}`);
      }
    }
  
    findById(id: string): Observable<T> {
      if (environment.dummy) {
        return this.getById(id);
      } else {
        return this.http.get<T>(`${this.basePath}/${id}`);
      }
    }
  
    create(data: T): Observable<any> {
      if (environment.dummy) {
        return this.createNew(data);
      } else {
        return this.http.post(`${this.basePath}`, data)
      }
    }
  
    update(id, data: T): Observable<any> {
      if (environment.dummy) {
        return this.updateById(data, id);
      } else {
        return this.http.put(`${this.basePath}/${id}`, data);
      }
    }
  
    delete(id: string): Observable<any> {
      if (environment.dummy) {
        return this.deleteById(id);
      } else {
        return this.http.delete(`${this.basePath}/${id}`);
      }
    }

}