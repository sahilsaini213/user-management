import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from 'src/app/modules/ng-prime/ng-prime.module';
import { QMenuComponent } from './menu.component';
import { QMenuitemComponent } from './menuitem.component';


@NgModule({
  declarations: [
    QMenuitemComponent,
    QMenuComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule
  ],
  exports: [
    QMenuComponent
  ]
})
export class QMenuModule { }
