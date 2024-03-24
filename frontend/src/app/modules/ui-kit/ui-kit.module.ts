import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { QMenuModule } from './components/menu/menu.module';
import { UIKIT_COMPONENTS } from './components';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UIKIT_DIRECTIVES } from './directives';

@NgModule({
  declarations: [
    ...UIKIT_COMPONENTS,
    ...UIKIT_DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgPrimeModule,
    EditorModule,
    QMenuModule,
    PickerModule
  ],
  exports: [
    QMenuModule,
    ...UIKIT_COMPONENTS,
    ...UIKIT_DIRECTIVES
  ]
})
export class UiKitModule { }
