import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableList } from 'src/app/classes/base-list';
import { BaseService } from 'src/app/classes/base-service';
import { IUser } from 'src/app/modules/q-auth/q-auth-model';
import { deleteUser, getUser, getAdminUsers, saveUser } from 'src/mock-data/user-management/userlist_data';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends BaseService<IUser> {
  
  basePath = 'admins/users';

  constructor(public http: HttpClient) {
    super(http);
   }


  getList(query?: any): Observable<ITableList<IUser>> {
    return getAdminUsers(query);
  }

  getById(id: string): Observable<IUser> {
    return getUser(id);
  }

  createNew(data: Partial<IUser>): Observable<any> {
    return saveUser(data);
  }

  updateById(data: Partial<IUser>, id: any): Observable<any> {
    return saveUser(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteUser(id);
  }

}
