import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { PUBLIC_COMPONENTS } from './components';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { QSharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [PublicComponent, ...PUBLIC_COMPONENTS, ContactUsComponent],
  imports: [
    QSharedModule,
    RouterModule.forRoot([
      {
        path: '', component: PublicComponent, children: [
          { path: '', loadComponent: () => import('./pages/home/home.component').then( m => m.HomeComponent) },
          { path: 'home', loadComponent: () => import('./pages/home/home.component').then( m => m.HomeComponent) },
          { path: 'pricing', loadComponent: () => import('./pages/pricing/pricing.component').then( m => m.PricingComponent) },
          { path: 'about-us', loadComponent: () => import('./pages/about-us/about-us.component').then( m => m.AboutUsComponent) }
        ]
      },
      { path: 'error', loadComponent: () => import('./pages/error/error.component').then( m => m.ErrorComponent) },
      { path: 'notfound', loadComponent: () => import('./pages/notfound/notfound.component').then( m => m.NotfoundComponent)},
      { path: 'access', loadComponent: () => import('./pages/access/access.component').then( m => m.AccessComponent)}
    ])
  ]
})
export class PublicModule { }
