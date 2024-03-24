import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { FormControlService } from 'src/app/service/form-control.service';
import { ToastService } from 'src/app/service/toast.service';
import { PAYMENT_TYPES } from '../const';

@Component({
  selector: 'add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  addPaymentForm: FormGroup;
  selectedRow: any[];
  selectedRowId = null;
  submitted: boolean = false;
  isNew = true;
  paymentTypes = PAYMENT_TYPES;

  constructor(
    private toastService: ToastService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formControlService: FormControlService
  ) { }

  findPaymentType(id: number) {
    return this.paymentTypes.find(type => type.id == id)
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.selectedRow = this.config.data.selectedRow;
      this.selectedRowId = this.config.data.selectedRow.reference;
      if (this.selectedRowId) {
        this.isNew = false;
        this.submitted = true;
        this.formInit(this.selectedRow);
        this.submitted = false
      }
    }
    else this.formInit();
  }

  formInit(data: any = {}) {
    this.addPaymentForm = new FormGroup({
      received_amount: this.formControlService.getFormControl(data?.paid, [Validators.required]),
      paying_amount: this.formControlService.getFormControl(data?.grand_total, [Validators.required]),
      change: this.formControlService.getFormControl(data?.change),
      payment_type_id: this.formControlService.getFormControl(data.payment_type_id, [Validators.required]),
      card_number: this.formControlService.getFormControl(data?.card_number),
      expired_date: this.formControlService.getFormControl(data?.expired_date),
      sales_note: this.formControlService.getFormControl(data?.sales_note),
    });
  }

  onSubmit() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.addPaymentForm.valid) {
      this.submitted = true;
      const payload = { ...this.addPaymentForm.value };
      if (this.config.data.savePayment) {
        this.config.data.savePayment(payload, this.selectedRowId)
          .pipe(finalize(() => this.submitted = false),)
          .subscribe((res: any) => {
            this.toastService.success({ message: res.message, sticky: false });
            this.config.data.onClose(true);
            this.onClose();
          })
      }
    }
  }

  onClose() {
    this.ref.close();
  }

  get controls() { return this.addPaymentForm.controls; }

}