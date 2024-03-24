import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RouteService } from 'src/app/service/route.service';
import { ContactUsComponent } from '../../pages/contact-us/contact-us.component';

@Component({
  selector: 'q-public-topbar',
  templateUrl: './public-topbar.component.html',
  styleUrls: ['./public-topbar.component.scss'],
  host: { 'class': 'surface-0 d-flex w-full z-4' }
})
export class PublicTopbarComponent implements OnInit {
  @Input() config: any = {};
  @Input() isLoggedIn = false;
  @Input() isEmployee = false;
  ref: DynamicDialogRef;
  constructor(
    private qAuthService: QAuthService,
    public routeService: RouteService,
    public dialogService: DialogService,
  ) { }
   
  ngOnInit(): void {
  }

  logout() {
    this.qAuthService.logout(() => {
      this.routeService.navigateByURL('auth/signin');
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
}
