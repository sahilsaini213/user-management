import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { WarehouseManagementService } from 'src/app/pages/admin/pages/warehouse-management/warehouse-management.service';
import { IWarehouse } from 'src/app/pages/employee/employee.model';
import { FormControlService } from 'src/app/service/form-control.service';
import { ArrayUtil } from 'src/app/utils/array.utils';
import { IStockReport, ReportsService } from '../reports.service';

@Component({
  selector: 'stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent extends BaseList<IStockReport> implements OnInit {
  today = new Date();
  stockForm: FormGroup;
  warehouseList: IWarehouse[] = [];
  submitted = false;
  warehouseId = null;
  tableColumnsCount: number = 9;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  columns: Partial<IUikitColumn>[] = [
    { key: 'date', label: 'Date', style: 'min-width:10rem;', type: 'date' },
    { key: 'warehouse', label: 'Warehouse', style: 'min-width:12rem;' },
    { key: 'product', label: 'Product', style: 'min-width:10rem;' },
    { key: 'unit', label: 'Unit', style: 'min-width:9rem;'  },
    { key: 'opening_stock', label: 'Opening Stock', style: 'min-width:14rem;', type: 'numeric'  },
    { key: 'received', label: 'Received', style: 'min-width:12rem;', type: 'numeric'  },
    { key: 'total', label: 'Total', style: 'min-width:12rem;', type: 'numeric'  },
    { key: 'sales', label: 'Sales', style: 'min-width:12rem;', type: 'numeric'  },
    { key: 'closing_stock', label: 'Closing Stock', style: 'min-width:13rem;', type: 'numeric'  },
  ];

  constructor(
    private reportsService: ReportsService,
    private warehouseService: WarehouseManagementService,
    private formControlService: FormControlService,
    private cdref: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.onInIt();
    this.warehouseService.list().subscribe((res) => {
      this.warehouseList = res.list;
    });
    this.formInit()
  }

  fetch() {
    return this.reportsService.list();
  }

  delete(id) {
    return this.reportsService.delete(id);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  formInit() {
    this.stockForm = new FormGroup({
      date: this.formControlService.getDateControl(),
      warehouses: this.formControlService.getFormControl()
    });
  }

  onSubmit() {
    if (this.submitted) return;
    if (this.stockForm.valid) {
      this.loading = true;
      this.submitted = true;
      const payload = { ...this.stockForm.value };
      this.reportsService.getstock(payload.date, payload.warehouse_id)
        .pipe(finalize(() => this.submitted = false),)
        .subscribe((res: any) => {
          this.loading = false;
          this.list = res;
        });
    }
  }

  print() { }

  reset() {
    this.stockForm.patchValue({ date: "", warehouses: [] });
    this.fetchList();
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  get controls() { return this.stockForm.controls; }
}
