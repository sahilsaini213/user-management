import { NgModule } from '@angular/core';
import { WAREHOUSE_PAGES } from './pages';
import { WAREHOUSE_GUARDS } from './guards';
import { DashboardService } from './pages/warehouse-exist/analytic/dashboard.service';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { WAREHOUSE_COMPONENTS } from './components';
import { RouterModule } from '@angular/router';
import { WAREHOUSE_ROUTES } from './employee.routes';

@NgModule({
  declarations: [
    ...WAREHOUSE_COMPONENTS,
    ...WAREHOUSE_PAGES,
  ],
  imports: [
    QSharedModule,
    RouterModule.forChild(WAREHOUSE_ROUTES),
  ],
  providers: [WAREHOUSE_GUARDS, DashboardService]
})
export class WarehouseModule { }
