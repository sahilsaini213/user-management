import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgPrimeModule } from 'src/app/modules/ng-prime/ng-prime.module';
import { QThemeConfig } from 'src/app/modules/q-theme';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { UiKitModule } from 'src/app/modules/ui-kit/ui-kit.module';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true,
  imports: [
    NgPrimeModule,
    UiKitModule
  ]
})
export class PricingComponent implements OnInit {
  config: QThemeConfig;

  subscription: Subscription;

  questions = [
    {
      header: 'Why is Wims offering a free product?',
      description: ` We want every Indian SME to use Wims. With free plan all our customers can first 
      experience the value TranZact brings and only upgrade to paid plan at their own convenience.`
    },
    {
      header: 'Will I get proper on-boarding and support?',
      description: `We believe that the best companies in the world have amazing customer
       support and champion the customer. 
      We have 24x7 chat support and our average response time is less than a minute.`
    },
    {
      header: 'Will the free product add value?',
      description: `The core functions of any manufacturing SME are Sales, 
      Purchase, Inventory and Production. Our free plan helps you to take this
       first step towards digitization by streamlining your Sales,
       Purchase and Inventory which covers 80% of your core operations.`
    },
    {
      header: 'Is my Data Secure?',
      description: `With Wims, you can be sure that all of your data is accounted for and secure.
       All of our customer data is encrypted,
       which means no one has an access to the sensitive information about you or your business.`
    },    
  ];

  constructor(public configService: QThemeService, public router: Router) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
