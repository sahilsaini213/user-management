import { Route } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { AnalyticComponent } from './pages/analytic/analytic.component';

export const SUPER_ADMIN_ROUTES: Route[] = [
    {
        path: '', component: SuperAdminComponent,
        children: [
            {path: '', component: AnalyticComponent},
            {path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
        ],
    }
];