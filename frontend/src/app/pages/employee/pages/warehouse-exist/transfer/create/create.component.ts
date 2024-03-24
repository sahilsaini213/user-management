import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WarehouseManagementService } from 'src/app/pages/admin/pages/warehouse-management/warehouse-management.service';
import { IWarehouse } from 'src/app/pages/employee/employee.model';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { InvoiceSummaryComponent } from '../../components/invoice-summary/invoice-summary.component';
import { PaymentSummaryComponent } from '../../components/payment-summary/payment-summary.component';
import { ProductsService } from '../../products/products.service';
import { STATUS } from '../../components/const';
import { IProductTransfer, TransferService } from '../transfer.service';
import { BaseForm } from 'src/app/classes/base-form';

@Component({
  selector: 'transfer-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class TransferFormComponent extends BaseForm implements OnInit {
  status = STATUS;
  warehouseList: IWarehouse[] = [];
  toWarehouses: IWarehouse[];
  today = new Date();
  @ViewChild(PaymentSummaryComponent) PaymentSummary: PaymentSummaryComponent;
  @ViewChild(InvoiceSummaryComponent) InvoiceSummary: InvoiceSummaryComponent;

  constructor(
    public transferService: TransferService,
    public productService: ProductsService,
    public warehouseService: WarehouseManagementService,
    private routeService: RouteService,
    public activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private formControlService: FormControlService
  ) {
    super(activatedRoute);
  }

  ngOnInit(): void {
    this.onInIt();
    this.warehouseService.list().subscribe((res) => {
      this.warehouseList = res.list;
    });
  }

  getFormEditDetail(id) {
    return this.transferService.findById(id);
  }

  formInit(data: Partial<IProductTransfer> = {}) {
    return new FormGroup({
      date: this.formControlService.getDateControl(data.date ? new Date(data.date) : null, [Validators.required]),
      product: this.formControlService.getNameControl(data?.product),
      from_warehouse_id: this.formControlService.getFormControl(data?.from_warehouse_id, [Validators.required]),
      status_id: this.formControlService.getFormControl(data?.status_id, [Validators.required]),
      to_warehouse_id: this.formControlService.getFormControl(data?.to_warehouse_id, [Validators.required]),
    });
  }

  ngAfterViewInit() {
    this.form.addControl('payment_summary', this.PaymentSummary.form);
    this.PaymentSummary.form.setParent(this.form);
  }

  handleWarehouseChange() {
    this.form.patchValue({ to_warehouse_id: '' });
    this.toWarehouses = this.warehouseList?.filter(warehouse => warehouse.id !== this.from_warehouseId);
  }

  onSubmit() {
    const payload = this.form.getRawValue();
    const transferReq = this.isNew ? this.transferService.createNew(payload) : this.transferService.updateById(payload, this.id);
    transferReq.subscribe((res: any) => {
      this.toastService.success({ message: res.message, sticky: false });
      this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
    });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

  get from_warehouseId() { return this.form.get('from_warehouse_id').value; }
}
