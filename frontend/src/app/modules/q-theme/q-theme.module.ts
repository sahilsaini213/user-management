import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { QThemeComponent } from './q-theme.component';



@NgModule({
  declarations: [QThemeComponent],
  imports: [
    CommonModule,
    NgPrimeModule
  ],
  exports: [
    QThemeComponent
  ]
})
export class QThemeModule { }
