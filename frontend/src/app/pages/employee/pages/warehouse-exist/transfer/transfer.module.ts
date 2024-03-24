import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TransferFormComponent } from './create/create.component';
import { TransferComponent } from './list/transfer.component';
import { AddPaymentComponent } from '../components/add-payment/add-payment.component';
import { ViewPaymentComponent } from '../components/view-payment/view-payment.component';
import { ComponentModule } from '../components/component.module';

@NgModule({
  declarations: [
    TransferFormComponent,
    AddPaymentComponent,
    ViewPaymentComponent
  ],
  imports: [
    CommonModule,
    QSharedModule,
    ComponentModule,
    RouterModule.forChild([
      { path: '', component: TransferComponent },
      { path: ':id', component: TransferFormComponent }
    ]),
  ]
})
export class TransferModule { }
