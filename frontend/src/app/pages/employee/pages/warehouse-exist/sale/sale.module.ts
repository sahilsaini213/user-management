import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleFormComponent } from './create/create.component';
import { SaleListComponent } from './list/list.component';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../components/component.module';



@NgModule({
  declarations: [
    SaleFormComponent,
    SaleListComponent
  ],
  imports: [
    CommonModule,
    QSharedModule,
    ComponentModule,
    RouterModule.forChild([
      { path: '', component: SaleListComponent },
      { path: ':id', component: SaleFormComponent }
    ]),
  ]
})
export class SaleModule { }
