import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { FormControlService } from 'src/app/service/form-control.service';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { IUser } from 'src/app/modules/q-auth/q-auth-model';
import { IImage, UikitImageComponent } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';
import { ToastService } from 'src/app/service/toast.service';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';


@Component({
  selector: 'personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.scss']
})
export class PersonalSettingsComponent implements OnInit {
  form: FormGroup;
  user: IUser = {};
  activeTabIndex = 0;
  isDestroy = false;
  submitted: boolean = false;
  phone = MultiInputMode.PHONE;
  email = MultiInputMode.EMAIL;
  @ViewChild(UikitImageComponent) uikitImageComponent: UikitImageComponent;
  settingTabs: MenuItem[] = [
    { label: 'User Info', id: 'userInfo', command: this.tabChange.bind(this) },
    // { label: 'Email Notifications', id: 'emailSettings', command: this.tabChange.bind(this) }
  ];
  activeTab = this.settingTabs[this.activeTabIndex].id;

  constructor(
    private formControlService: FormControlService,
    private qAuthService: QAuthService,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    const res = await this.qAuthService.me();
    if (res) {
      this.user = res.user;
      this.uikitImageComponent?.setPreUploadedImages([this.user.image] || []);
      this.formInit(this.user);
    }
  }

  formInit(user: IUser) {
    this.form = new FormGroup({
      first_name: this.formControlService.getNameControl(user.first_name),
      last_name: this.formControlService.getFormControl(user.last_name),
      password: this.formControlService.getFormControl(user.password),
      email: this.formControlService.getMultiInputControl(user.email),
      phone_number: this.formControlService.getMultiInputControl(user.phone_number),
    });
  }

  ngAfterViewInit(): void {
    this.uikitImageComponent?.setPreUploadedImages([this.user.image] || []);
  }

  onSubmit() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.form.valid) {
      this.submitted = true;
      const payload = { ...this.form.getRawValue(), image: this.user.image };
      const userReq = this.qAuthService.updatePersonalInfo(payload)
      this.toastService.success({ message: 'Profile Updated successfully.', sticky: false });
      this.back();
    }
  }

  onImageSelectionChange(images: IImage) {
    this.user.image = images[0];
  }

  tabChange(res) {
    this.activeTab = res.item.id;
  }

  back() {
    history.back();
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

  get controls() { return this.form.controls; }

}