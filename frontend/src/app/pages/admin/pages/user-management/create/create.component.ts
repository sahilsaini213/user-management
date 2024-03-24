import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/app/classes/base-form';
import { IUser } from 'src/app/modules/q-auth/q-auth-model';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';
import { IUIKitDropdown } from 'src/app/modules/ui-kit/components/uikit-dropdown/uikit-dropdown.component';
import { UikitImageComponent } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';
import { IWarehouse } from 'src/app/pages/employee/employee.model';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { RoleManagementService } from '../../role-management/role-management.service';
import { WarehouseManagementService } from '../../warehouse-management/warehouse-management.service';
import { UserManagementService } from '../user-management.service';
import { genders, status } from '../user.const';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseForm implements OnInit {

  selectegender: any;
  user:IUser={};
  multiInputMode = MultiInputMode.PHONE;
  genders = genders;
  roleFieldConfig: IUIKitDropdown = {
    label: 'role',
    service: this.roleService
  };
  warehouseList: IWarehouse[] = [];
  @ViewChild(UikitImageComponent) uikitImageComponent: UikitImageComponent;

  constructor(private formControlService: FormControlService,
    private userManagementService: UserManagementService,
    private roleService: RoleManagementService,
    private  warehouseService: WarehouseManagementService,
    private toastService: ToastService,
    private routeService: RouteService,
    public activatedRoute: ActivatedRoute,
  ) {
    super(activatedRoute);
  }

  ngOnInit() {
    this.onInIt();
    this.warehouseService.getList().subscribe((res) => {
      this.warehouseList = res.list;
    });
  }


  getFormEditDetail(id) {
    return this.userManagementService.findById(id);
  }

  formInit(user: Partial<IUser> = {}) {
     let userForm = new FormGroup({
      first_name: this.formControlService.getNameControl(user.first_name),
      last_name: this.formControlService.getFormControl(user.last_name),
      email: this.formControlService.getEmailControl(user.email),
      phone_number: this.formControlService.getMultiInputControl(user.phone_number),
      password: this.formControlService.getFormControl(user?.password),
      gender_id: this.formControlService.getFormControl(user.gender_id, [Validators.required]),
      is_active: this.formControlService.getBooleanControl(user.is_active),
      role_id: this.formControlService.getFormControl(user?.role_id, [Validators.required]),
      warehouses: this.formControlService.getFormControl(user?.warehouses, [Validators.required]),
    });
    this.uikitImageComponent?.setPreUploadedImages(!this.isNew ? [user.image] : []);
    return userForm;
  }

  onSubmit() {
    const payload = {...this.form.getRawValue(), image: this.user.image}
    let userReq = this.isNew ? this.userManagementService.create(payload) : this.userManagementService.update(this.id, payload);
    userReq.subscribe(() => {
      this.toastService.success({ message: `Request has been ${this.isNew ? 'created' : 'updated'} successfully.`, sticky: false });
      this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
    });
  }

  onImageSelectionChange(images) {
    this.user.image = images[0];
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }


}
