import { Route } from '@angular/router';
import { AnalyticComponent } from './pages/analytic/analytic.component';
import { AdminComponent } from './admin.component';

export const ADMIN_ROUTES: Route[] = [
  // {path: '', redirectTo: 'dashboard',  pathMatch: 'full'},
  // { path: 'dashboard', component: AnalyticComponent }
  {
    path: '', component: AdminComponent,
    children: [
        {path: '', component: AnalyticComponent},
        {path: 'user-management', loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule)},
        {path: 'warehouse-management', loadChildren: () => import('./pages/warehouse-management/warehouse-management.module').then(m => m.WarehouseManagementModule)},
        {path: 'role-management', loadChildren: () => import('./pages/role-management/role-management.module').then(m => m.RoleManagementModule)},
        {path: 'brands', loadChildren: () => import('./pages/brand/brand.module').then(m => m.BrandModule)},
        {path: 'product-category', loadChildren: () => import('./pages/product-category/product-category.module').then(m => m.ProductCategoryModule)},
        {path: 'supplier', loadChildren: () => import('./pages/supplier/supplier.module').then(m => m.SupplierModule)},
        {path: 'biller', loadChildren: () => import('./pages/biller/biller.module').then(m => m.BillerModule)}
    ],
}
];