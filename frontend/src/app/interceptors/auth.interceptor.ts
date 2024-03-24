import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  AUTHORIZATION = 'Authorization';

  constructor(
    private authService: QAuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqHeaders = [];
    const bearerToken = this.authService.getBearerToken();
    if (bearerToken) {
      reqHeaders.push({key: this.AUTHORIZATION, value: `Bearer ${bearerToken}`});
    }

    if (reqHeaders.length > 0) {
      let headers = new HttpHeaders();
      reqHeaders.forEach(header => {
        headers = headers.set(header.key, header.value);
      });
      const authReq = request.clone({ headers: headers});
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
