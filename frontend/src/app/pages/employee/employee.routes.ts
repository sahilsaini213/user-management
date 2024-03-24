import { EmployeeComponent } from './employee.component';
import { AnalyticComponent, NoWarehouseExistComponent,} from './pages/index';
import { EmptyWarehouseGuard } from './guards/index';
import { Route } from '@angular/router';
import { WarehouseExistComponent } from './pages/warehouse-exist/warehouse-exist.component';

export const WAREHOUSE_ROUTES: Route[] = [
    { path: '', component: EmployeeComponent,
      children: [
        {
            path: 'warehouse-info', component: NoWarehouseExistComponent
        },
        {
            path: ':warehouseId', component: WarehouseExistComponent, canActivate: [EmptyWarehouseGuard],
            children: [
                {path: '', redirectTo: 'dashboard',  pathMatch: 'full'},
                { path: 'dashboard', component: AnalyticComponent },
                {path: 'products', loadChildren: () => import('./pages/warehouse-exist/products/products.module').then(m => m.ProductsModule)},
                {path: 'generate-barcode', loadChildren: () => import('./pages/warehouse-exist/generate-barcode/generate-barcode.module').then(m => m.GenerateBarcodeModule)},
                {path: 'transfer', loadChildren: () => import('./pages/warehouse-exist/transfer/transfer.module').then(m => m.TransferModule)},
                {path: 'stock-report', loadChildren: () => import('./pages/warehouse-exist/reports/reports.module').then(m => m.ReportsModule)},
                {path: 'sale', loadChildren: () => import('./pages/warehouse-exist/sale/sale.module').then(m => m.SaleModule)}
            ],
        }
      ]
    }
];