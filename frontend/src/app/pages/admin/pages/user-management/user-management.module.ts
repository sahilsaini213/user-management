import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermanagementlistComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
  UsermanagementlistComponent,
       CreateComponent,
       
  ],
  imports: [
    CommonModule,
    QSharedModule,
    PasswordModule,
    RouterModule.forChild([
      { path: '', component:UsermanagementlistComponent },
      { path: ':id', component: CreateComponent },
    ]),

  ]
})
export class UserManagementModule { }
