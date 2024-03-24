import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getSummary } from 'src/mock-data/summary/admin_data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getSummary(): Observable<any> {
    if (environment.dummy) {
      return getSummary()
    } else {
      return this.http.get(`admin/summary`);
    }
  }

}
