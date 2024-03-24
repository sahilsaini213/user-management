import { NgModule } from '@angular/core';
import { ADMIN_PAGES } from './pages';
import { QSharedModule } from 'src/app/modules/shared/shared.module';
import { ADMIN_COMPONENTS } from './components';
import { ADMIN_ROUTES } from './admin.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ...ADMIN_COMPONENTS,
    ...ADMIN_PAGES
  ],
  imports: [
    QSharedModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  providers: []
})
export class AdminModule { }
