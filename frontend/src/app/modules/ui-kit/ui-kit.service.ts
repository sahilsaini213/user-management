import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiKitService {

  constructor(private http: HttpClient) { }

  getRequest(url) {
    return this.http.get(url);
  }

}
