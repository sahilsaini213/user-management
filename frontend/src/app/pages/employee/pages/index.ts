import { EmployeeComponent } from '../employee.component';
import { NoWarehouseExistComponent } from './no-warehouse-exist/no-warehouse-exist.component';
import { AnalyticComponent } from './warehouse-exist/analytic/analytic.component';
import { GenerateBarcodeComponent } from './warehouse-exist/generate-barcode/generate-barcode.component';
import { StockReportComponent } from './warehouse-exist/reports/stock-report/stock-report.component';
import { TransferComponent } from './warehouse-exist/transfer/list/transfer.component';
import { WarehouseExistComponent } from './warehouse-exist/warehouse-exist.component';

export const WAREHOUSE_PAGES = [
    AnalyticComponent,
    NoWarehouseExistComponent,
    WarehouseExistComponent,
    EmployeeComponent,
    GenerateBarcodeComponent,
    TransferComponent,
    StockReportComponent
];

export {
    AnalyticComponent,
    NoWarehouseExistComponent,
    WarehouseExistComponent,
    EmployeeComponent,
    GenerateBarcodeComponent,
    TransferComponent,
    StockReportComponent
}