import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { QAuthService } from './q-auth.service';

@Injectable({
  providedIn: 'root'
})
export class QAuthenticationGuard implements CanActivate {

  constructor(
    private authService: QAuthService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn();
  }
}
