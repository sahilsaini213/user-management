import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BrandComponent } from './brand.component';
import { CreateBrandComponent } from './create/create.component';

@NgModule({
  declarations: [
    CreateBrandComponent,
    BrandComponent
  ],
  imports: [
    CommonModule,
    QSharedModule,
    RouterModule.forChild([
      { path: '', component: BrandComponent },
    ]),
  ]
})
export class BrandModule { }
