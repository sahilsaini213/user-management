import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, Subscription, takeWhile } from 'rxjs';
import { QThemeConfig } from 'src/app/modules/q-theme';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { IRole, RoleManagementService } from '../role-management.service';

@Component({
  selector: 'role-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  roleform: FormGroup;
  config: QThemeConfig;
  isDestroy = false;
  loading = false;
  role: IRole[];
  submitted: boolean = false;
  isNew = true;
  roleId = null;
  selectedRole;
  activatedRouteParamsSubscribe: Subscription;


  constructor(private formControlService: FormControlService,
    private rolemanagementService: RoleManagementService,
    private ref: DynamicDialogRef,
    private dialogconfig: DynamicDialogConfig,
    private toastService: ToastService,
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute,
    private qThemeService: QThemeService
  ) {
    this.selectedRole = dialogconfig.data.selectedRole;
    this.roleId = dialogconfig.data?.selectedRole?.id;
    if (this.roleId) {
      this.isNew = false;
    }
    this.paramsUpdated();
  }

  paramsUpdated() {
    if (this.isNew) {
      this.formInit();
    } else {
          this.formInit(this.selectedRole)
    }
  }
  formInit(role: IRole = {}) {
    this.roleform = new FormGroup({
      name: this.formControlService.getNameControl(role?.name),
      message: this.formControlService.getFormControl(role?.message, [Validators.required]),
    });
  } 

  onSubmit() {
    this.toastService.clear();
    this.submitted = true;
    const payload = { ...this.roleform.value };
    const roleReq = !this.roleId ? this.rolemanagementService.create(payload) : this.rolemanagementService.update(this.roleId, payload)
    roleReq.subscribe(() => {
      this.toastService.success({ message: 'Your role has been successfully Created.', sticky: false });
      this.loading = false;
      this.submitted = false;
      this.onClose();
    });
  }

  get controls() { return this.roleform.controls; }
  get name() { return this.roleform.get('name'); }
  get message() { return this.roleform.get('message'); }

  ngOnInit(): void {
    this.config = this.qThemeService.config;
    this.qThemeService.configUpdate$
      .pipe(takeWhile(() => !this.isDestroy))
      .subscribe(config => {
        this.config = config;
      });
  }

  onClose() {
    this.ref.close(true);
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }


}

