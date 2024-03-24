import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/app/classes/base-form';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';
import { UikitImageComponent } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';
import { IWarehouse } from 'src/app/pages/employee/employee.model';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { WarehouseManagementService } from '../warehouse-management.service';
import { ICountry } from '../warehouse.const';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class WharehouseCreateComponent extends BaseForm implements OnInit {

  warehouse:IWarehouse={};
  multiInputMode = MultiInputMode.PHONE;
  countries: ICountry[];
  @ViewChild(UikitImageComponent) uikitImageComponent: UikitImageComponent;

  constructor(private formControlService: FormControlService,
    private toastService: ToastService,
    private employeeService: WarehouseManagementService,
    private routeService: RouteService,
    public activatedRoute: ActivatedRoute,
    private qThemeService: QThemeService,
  ) {
    super(activatedRoute);
  }


  ngOnInit() {
    this.employeeService.countrylist().subscribe((res: any) => {
      this.countries = res;
    });
    this.onInIt();
  }
  getFormEditDetail(id) {
    return this.employeeService.findById(id);
  }

  formInit(warehouse: Partial<IWarehouse> = {}) {
    let warehouseForm = new FormGroup({
      name: this.formControlService.getNameControl(warehouse?.name),
      email: this.formControlService.getEmailControl(warehouse?.email),
      phone_number: this.formControlService.getMultiInputControl(warehouse?.phone_number),
      city: this.formControlService.getFormControl(warehouse?.city, [Validators.required]),
      country_id: this.formControlService.getFormControl(warehouse?.country_id, [Validators.required]),
      zipcode: this.formControlService.getFormControl(warehouse?.zipcode, [Validators.required]),
      address: this.formControlService.getFormControl(warehouse?.address, [Validators.required]),
      is_active: this.formControlService.getBooleanControl(warehouse.is_active),
    });
    this.uikitImageComponent?.setPreUploadedImages(!this.isNew ? [warehouse.image] : []);
    return warehouseForm;
  }

  onImageSelectionChange(images) {
    this.warehouse.image = images[0];
  }
 

  onSubmit() {
    const payload ={ ...this.form.getRawValue(),image: this.warehouse.image}
    let userReq = this.isNew ? this.employeeService.create(payload) : this.employeeService.update(this.id, payload);
    userReq.subscribe(() => {
      this.toastService.success({ message: `Request has been ${this.isNew ? 'created' : 'updated'} successfully.`, sticky: false });
      this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
    });
  }

  

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

}
