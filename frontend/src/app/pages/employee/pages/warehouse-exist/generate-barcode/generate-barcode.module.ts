import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { GenerateBarcodeComponent } from './generate-barcode.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QSharedModule,
    RouterModule.forChild([
      { path: '', component: GenerateBarcodeComponent }
    ]),
  ]
})
export class GenerateBarcodeModule { }
