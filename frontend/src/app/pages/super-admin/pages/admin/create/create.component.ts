import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControlService } from 'src/app/service/form-control.service';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';
import { ToastService } from 'src/app/service/toast.service';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/app/service/route.service';
import { AdminService } from '../admin.service';
import { BaseForm } from 'src/app/classes/base-form';
import { IUser } from 'src/app/modules/q-auth/q-auth-model';
import { UikitImageComponent } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';

@Component({
  selector: 'manage-brands',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class AdminFormComponent extends BaseForm implements OnInit {
  multiInputMode = MultiInputMode.PHONE;
  user: IUser = {};
  @ViewChild(UikitImageComponent) uikitImageComponent: UikitImageComponent;

  constructor(
    public formControlService: FormControlService,
    public adminService: AdminService,
    private toastService: ToastService,
    public activatedRoute: ActivatedRoute,
    public routeService: RouteService
  ) {
    super(activatedRoute);
  }

  ngOnInit() {
    this.onInIt();
  }

  onImageSelectionChange(images) {
    this.user.image = images[0];
  }

  getFormEditDetail(id) {
    return this.adminService.findById(id);
  }

  formInit(admin: Partial<IUser> = {}) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~`\|\-]).{8,}$/;
    let adminForm = new FormGroup({
      first_name: this.formControlService.getFormControl(admin.first_name,[Validators.pattern(/^[A-Za-z\s\-]+$/)]),
      last_name: this.formControlService.getFormControl(admin.last_name),
      password: this.formControlService.getFormControl(admin.password,  [Validators.pattern(passwordPattern)]),
      confirmPassword: this.formControlService.getFormControl(admin.password),
      email: this.formControlService.getEmailControl(admin.email),
      is_active: this.formControlService.getBooleanControl(admin.is_active),
      phone_number: this.formControlService.getMultiInputControl(admin.phone_number),
    });
    this.uikitImageComponent?.setPreUploadedImages(!this.isNew ? [admin.image] : []);
    return adminForm;
  }

  onSubmit() {
    const payload = { ...this.form.getRawValue(), image: this.user.image }
    delete payload.confirmPassword;
    let userReq = this.isNew ? this.adminService.create(payload) : this.adminService.update(this.id, payload);
    userReq.subscribe(() => {
      this.toastService.success({ message: `Request has been ${this.isNew ? 'created' : 'updated'} successfully.`, sticky: false });
      this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = this.form.get('password');
    const confirmPasswordControl =this.form.get('confirmPassword');
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}