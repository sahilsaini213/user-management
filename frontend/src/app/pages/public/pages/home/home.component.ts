import { Component, OnInit, OnDestroy } from '@angular/core';
import { QThemeService } from '../../../../modules/q-theme/q-theme.service';
import { QThemeConfig } from '../../../../modules/q-theme';
import { Subscription } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { UiKitModule } from 'src/app/modules/ui-kit/ui-kit.module';
import { NgPrimeModule } from 'src/app/modules/ng-prime/ng-prime.module';
import { ReactiveFormsModule, } from '@angular/forms';
import { RouteService } from 'src/app/service/route.service';
import { QSkeletonType } from 'src/app/modules/ui-kit/components/q-skeleton/q-skeleton.component';
import { MenuItem } from 'primeng/api';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'src/app/service/dialog.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    DividerModule,
    NgPrimeModule,
    UiKitModule,
    ReactiveFormsModule
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  config: QThemeConfig;
  subscription: Subscription;
  submitted: boolean = false;
  skeletonType = QSkeletonType.CARD;
  items: MenuItem[];
  ref: DynamicDialogRef;
  
  constructor(
    public configService: QThemeService,
    public routeService: RouteService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  showContactUsForm() {
    this.ref = this.dialogService.openHeaderLess(ContactUsComponent,{
      width: '65%',
    });
    this.ref.onClose.subscribe((isSubmitted) => {
      if (isSubmitted) {
        
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
