import { NgModule } from '@angular/core';
import { AUTH_COMPONENTS } from './components';
import { AUTH_PAGES } from './pages';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QSharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ...AUTH_COMPONENTS,
    ...AUTH_PAGES
  ],
  imports: [
    AuthRoutingModule,
    QSharedModule 
  ],
  providers: [AngularFireAuth]
})
export class QAuthModule { }
