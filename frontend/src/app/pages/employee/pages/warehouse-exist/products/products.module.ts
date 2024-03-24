import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    QSharedModule,
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: ':id', component: CreateComponent }
    ]),
  ]
})
export class ProductsModule { }
