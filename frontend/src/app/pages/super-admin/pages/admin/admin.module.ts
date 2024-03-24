import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminFormComponent } from './create/create.component';
import { ManageAdminListComponent } from './list/list.component';
import { AdminService } from './admin.service';
import { QSharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    ManageAdminListComponent,
    AdminFormComponent
  ],
  imports: [
    QSharedModule,
    RouterModule.forChild([
      { path: '', component:ManageAdminListComponent },
      { path: ':id', component:  AdminFormComponent }
    ]),
  ],
  providers: [AdminService]
})
export class AdminModule { }
