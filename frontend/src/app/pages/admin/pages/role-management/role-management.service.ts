import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITableList } from 'src/app/classes/base-list';
import { deleteRole, getRole, getRoles, saveRole } from 'src/mock-data/role-management/rolelist_data';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/classes/base-service';

export interface IRole {
  id?: string,
  name?: string,
  message?: string,
}

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService extends BaseService<IRole> {
  basePath = 'admins/roles';

  constructor(public http: HttpClient) {
    super(http);
  }

  getList(query?: any): Observable<ITableList<IRole>> {
    return getRoles(query);
  }

  getById(id: string): Observable<IRole> {
    return getRole(id);
  }

  createNew(data: Partial<IRole>): Observable<any> {
    return saveRole(data);
  }

  updateById(data: Partial<IRole>, id: any): Observable<any> {
    return saveRole(data, id);
  }

  deleteById(id: string): Observable<any> {
    return deleteRole(id);
  }

}
