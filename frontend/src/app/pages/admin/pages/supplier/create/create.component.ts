import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { ISupplier, SupplierService } from '../supplier.service';
import { ICountry } from '../../warehouse-management/warehouse.const';
import { WarehouseManagementService } from '../../warehouse-management/warehouse-management.service';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';
import { BaseForm } from 'src/app/classes/base-form';

@Component({
  selector: 'supplier-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent  extends BaseForm  implements OnInit {

  countries: ICountry[];
  multiInputMode = MultiInputMode.PHONE;


  constructor(
    private supplierService: SupplierService,
    private employeeService: WarehouseManagementService,
    private formControlService: FormControlService,
    private toastService: ToastService,
    private routeService: RouteService,
    public activatedRoute: ActivatedRoute,
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
    return this.supplierService.findById(id);
  }

  formInit(supplier: Partial<ISupplier> = {}) {
    return new FormGroup({
      name: this.formControlService.getNameControl(supplier.name),
      code: this.formControlService.getFormControl(supplier.code, [Validators.required]),
      phone_number: this.formControlService.getMultiInputControl(supplier.phone_number),
      email: this.formControlService.getEmailControl(supplier.email),
      country_id: this.formControlService.getFormControl(supplier.country_id, [Validators.required]),
      city: this.formControlService.getFormControl(supplier.city, [Validators.required]),
      address: this.formControlService.getFormControl(supplier.address, [Validators.required]),
      company: this.formControlService.getFormControl(supplier.company, [Validators.required])
    });
  }

  handleCountryChange() {
    this.form.patchValue({ city: "", address: "", zip: "" });
  }

  

  onSubmit() {
    const payload = this.form.getRawValue();
    let userReq = this.isNew ? this. supplierService.create(payload) : this. supplierService.update(this.id, payload);
    userReq.subscribe(() => {
      this.toastService.success({ message: `Request has been ${this.isNew ? 'created' : 'updated'} successfully.`, sticky: false });
      this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
    });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }
  
}
