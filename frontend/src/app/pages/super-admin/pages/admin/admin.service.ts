import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { IUser } from 'src/app/modules/q-auth/q-auth-model';
import { saveAdmin, getAdmins, deleteUser, getAdmin } from 'src/mock-data/user';

@Injectable()
export class AdminService extends BaseService<IUser> {  
  basePath = 'sadmin/admins';
  constructor(public http: HttpClient) {
    super(http);
  }

  getList(query?: any): Observable<ITableList<IUser>> {
    return getAdmins(query);
  }

  getById(id: string): Observable<IUser> {
    return getAdmin(id);
  }

  createNew(data: Partial<IUser>): Observable<any> {
    return saveAdmin(data);
  }

  updateById(data: Partial<IUser>, id: any): Observable<any> {
    return saveAdmin(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteUser(id);
  }
  
}