import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseForm } from 'src/app/classes/base-form';
import { FormControlService } from 'src/app/service/form-control.service';
import { PAYMENT_STATUS, STATUS, TAXES } from '../const';

@Component({
  selector: 'payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent extends BaseForm implements OnInit {
  form: FormGroup;
  @Input() formGroupName: string;
  @Input() status = STATUS;
  @Input() paymentStatus = PAYMENT_STATUS;
  @Input() taxes = TAXES;

  constructor(
    private formControlService: FormControlService,
    private formGroupDirective: FormGroupDirective,
    public activatedRoute: ActivatedRoute,
  ) {
    super(activatedRoute);
  }

  ngOnInit(): void {
    this.onInIt();
  }

  getFormEditDetail(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  formInit(data: any = {}) {
    this.form = this.formGroupDirective.control.get(this.formGroupName) as FormGroup;
    return new FormGroup({
      tax_id: this.formControlService.getFormControl(data?.tax_id),
      discount: this.formControlService.getFormControl(data?.discount, []),
      shipping: this.formControlService.getFormControl(data?.shipping, []),
      sale_status_id: this.formControlService.getFormControl(data?.sale_status_id),
      payment_status_id: this.formControlService.getFormControl(data?.payment_status_id),
      sales_note: this.formControlService.getFormControl(data?.sales_note, []),
      staff_remark: this.formControlService.getFormControl(data?.staff_remark, []),
    });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }
}