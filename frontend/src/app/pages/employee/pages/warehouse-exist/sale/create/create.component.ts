import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ISupplier, SupplierService } from 'src/app/pages/admin/pages/supplier/supplier.service';
import { WarehouseManagementService } from 'src/app/pages/admin/pages/warehouse-management/warehouse-management.service';
import { IWarehouse } from 'src/app/pages/employee/employee.model';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { PaymentSummaryComponent } from '../../components/payment-summary/payment-summary.component';
import { ProductsService } from '../../products/products.service';
import { STATUS, TAXES } from '../../components/const';
import { ISale, SaleService } from '../sale.service';
import { BaseForm } from 'src/app/classes/base-form';

@Component({
  selector: 'sale-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class SaleFormComponent extends BaseForm implements OnInit {
  warehouses: IWarehouse[] = [];
  suppliers: ISupplier[];
  taxes = TAXES
  status = STATUS;
  today = new Date();
  @ViewChild(PaymentSummaryComponent) childComponent: PaymentSummaryComponent;

  constructor(
    public saleService: SaleService,
    public productService: ProductsService,
    public warehouseService: WarehouseManagementService,
    public supplierService: SupplierService,
    public activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private toastService: ToastService,
    private formControlService: FormControlService
  ) {
    super(activatedRoute);
  }

  ngOnInit(): void {
    this.onInIt();
    this.warehouseService.list().subscribe((res) => {
      this.warehouses = res.list;
    });
    this.supplierService.list().subscribe((res) => {
      this.suppliers = res.list;
    });
  }

  getFormEditDetail(id) {
    return this.saleService.findById(id);
  }

  formInit(data: Partial<ISale> = {}) {
    return new FormGroup({
      date: this.formControlService.getDateControl(data.date ? new Date(data.date) : null, [Validators.required]),
      product: this.formControlService.getNameControl(data?.product),
      supplier_id: this.formControlService.getFormControl(data?.supplier_id),
      warehouse_id: this.formControlService.getFormControl(data?.warehouse_id),
      customer: this.formControlService.getNameControl(data?.customer),
      status_id: this.formControlService.getFormControl(data?.status_id),
    });
  }

  ngAfterViewInit() {
    this.form.addControl('payment_summary', this.childComponent.form);
    this.childComponent.form.setParent(this.form);
  }

  onSubmit() {
    const payload = this.form.getRawValue();
    const saleReq = this.isNew ? this.saleService.createNew(payload) : this.saleService.updateById(payload, this.id);
    saleReq.subscribe((res: any) => {
      this.toastService.success({ message: res.message, sticky: false });
      this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
    });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }
}
