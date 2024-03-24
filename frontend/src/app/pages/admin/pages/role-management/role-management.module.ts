import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import {  RolelistComponent } from './list/list.component';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';



@NgModule({
  declarations: [
    CreateComponent,
    RolelistComponent,
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    QSharedModule,
    PasswordModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component:RolelistComponent },
      { path: 'permissions', component:PermissionsComponent },
    ]),

  ]
})
export class RoleManagementModule { }
