import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  WarehousemanagementListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import {  WharehouseCreateComponent } from './create/create.component';
import { QSharedModule } from 'src/app/modules/shared/shared.module';



@NgModule({
  declarations: [
    WarehousemanagementListComponent,
    WharehouseCreateComponent
  ],
  imports: [
    CommonModule,
    QSharedModule,
    RouterModule.forChild([
      { path: '', component:WarehousemanagementListComponent},
      { path: ':id', component:WharehouseCreateComponent  },
    ]),
  ]
})
export class WarehouseManagementModule { }
