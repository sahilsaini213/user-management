import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastService } from 'src/app/service/toast.service';
import { RouteService } from 'src/app/service/route.service';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(
    private routeService: RouteService,
    private toastService: ToastService,
    private authService: QAuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            //this.authService.logout();
            this.routeService.navigateWithPreserve("auth/signin");
          } else if (err.status == 403){
            this.routeService.navigateWithPreserve("auth/unauthorized");
          } else if (err.status == 400 && err?.error?.errors){
            let errMsg = 'Invalid Request. Please correct your request.'
            const errors = err?.error?.errors;
            if(errors.length) errMsg = errors[0].msg;
            this.toastService.error({message: errMsg});
          } else {
            this.toastService.error({message: err.error?.error || 'Something bad happened. Please try again later.'});
          }
        }
      }));
  }
}
