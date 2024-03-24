import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { QThemeModule } from '../q-theme/q-theme.module';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { ReactiveFormsModule } from '@angular/forms';

const SHARED_MODULES = [
  CommonModule,
  NgPrimeModule,
  QThemeModule,
  UiKitModule,
  ReactiveFormsModule,
]

@NgModule({
  declarations: [],
  imports: SHARED_MODULES,
  exports: SHARED_MODULES
})
export class QSharedModule { }
