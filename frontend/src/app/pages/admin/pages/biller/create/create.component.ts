import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/app/classes/base-form';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';
import { IUIKitDropdown } from 'src/app/modules/ui-kit/components/uikit-dropdown/uikit-dropdown.component';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { WarehouseManagementService } from '../../warehouse-management/warehouse-management.service';
import { BillerService, IBiller } from '../biller.service';

@Component({
  selector: 'biller-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent  extends BaseForm  implements OnInit {

  warehousFieldConfig: IUIKitDropdown = {
    label: 'warehouse',
    service: this.warehouseService
  };
  multiInputMode = MultiInputMode.PHONE;

  constructor(
    private billerService: BillerService,
    private warehouseService: WarehouseManagementService,
    private formControlService: FormControlService,
    private toastService: ToastService,
    private qThemeService: QThemeService,
    private routeService: RouteService,
    public activatedRoute: ActivatedRoute,
  ) {
    super(activatedRoute);
  }
  ngOnInit() {
    this.onInIt();
  }
   getFormEditDetail(id) {
    return this. billerService.findById(id);
  }

  formInit(biller: Partial<IBiller> = {}) {
    return new FormGroup({
      name: this.formControlService.getNameControl(biller.name),
      date: this.formControlService.getDateControl(biller.date ? new Date(biller.date) : null, [Validators.required]),
      billercode: this.formControlService.getFormControl(biller.billercode, [Validators.required]),
      phone_number: this.formControlService.getMultiInputControl(biller.phone_number),
      email: this.formControlService.getEmailControl(biller.email),
      city: this.formControlService.getFormControl(biller.city, [Validators.required]),
      address: this.formControlService.getFormControl(biller.address, [Validators.required]),
      warehouse_id: this.formControlService.getFormControl(biller.warehouse_id),
    });
  }

  onSubmit() {
    const payload = this.form.getRawValue();
    let userReq = this.isNew ? this. billerService.create(payload) : this. billerService.update(this.id, payload);
    userReq.subscribe(() => {
      this.toastService.success({ message: `Request has been ${this.isNew ? 'created' : 'updated'} successfully.`, sticky: false });
      this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
    });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

}
