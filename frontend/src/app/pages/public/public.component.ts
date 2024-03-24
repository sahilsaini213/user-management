import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { QThemeConfig } from 'src/app/modules/q-theme';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  config: QThemeConfig;  
  isLoggedIn = false;
  subscription: Subscription;
  isEmployee = true;
  constructor(public configService: QThemeService, 
    public router: Router,
    private authService: QAuthService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn(); 
    this.authService.isEmployee().then( res => {
      this.isEmployee = res;
    });
  }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
