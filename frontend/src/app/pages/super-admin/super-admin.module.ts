import { NgModule } from '@angular/core';
import { SUPER_ADMIN_ROUTES } from './super-admin-routing';
import { SuperAdminComponent } from './super-admin.component';
import { AnalyticComponent } from './pages/analytic/analytic.component';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { SuperAdminService } from './super-admin.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SuperAdminComponent,
    AnalyticComponent,
  ],
  imports: [
    QSharedModule,
    RouterModule.forChild(SUPER_ADMIN_ROUTES)
  ],
  providers: [SuperAdminService]
})
export class SuperAdminModule { }
