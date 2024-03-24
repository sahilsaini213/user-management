import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService, LOCAL_STORAGE } from '../service/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  baseUrl = `${environment.base_url}/v1`;

  constructor(private lsc: LocalStorageService) { }

  getBaseUrl(): string {
    const fromStorage = this.lsc.get(LOCAL_STORAGE.APP_BASE_URL)
    return fromStorage ? `${fromStorage}/v1` : this.baseUrl;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({ url: `${this.getBaseUrl()}/${request.url}`});
    return next.handle(authReq);
  }

}
