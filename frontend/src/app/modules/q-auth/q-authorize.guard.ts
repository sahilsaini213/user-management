import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { QAuthService } from './q-auth.service';

@Injectable({
  providedIn: 'root'
})
export class QAuthorizeGuard implements CanActivate {

  constructor(
    private authService: QAuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.hasAnyAccess(route.data.userTypes);
  }
}
