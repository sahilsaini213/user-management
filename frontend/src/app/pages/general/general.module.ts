import { NgModule } from '@angular/core';
import { GeneralRoutingModule } from './general-routing.module';
import { GENERAL_COMPONENTS } from './pages';
import { GeneralComponent } from './general.component';
import { QSharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    GeneralComponent,
    ...GENERAL_COMPONENTS
  ],
  imports: [
    QSharedModule,
    GeneralRoutingModule
  ]
})
export class GeneralModule { }
