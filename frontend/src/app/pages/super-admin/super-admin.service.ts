import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getSummary } from 'src/mock-data/summary/super_admin_data';

@Injectable()
export class SuperAdminService {
  basePath='sadmin';

  constructor(private http: HttpClient) { }

  getsummary (){
    if (environment.dummy) {
        return getSummary();
      } else {
        return this.http.get(`${this.basePath}`);
      }
  }
  
}
