import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup } from '@angular/forms';
import { MultiInputMode } from 'src/app/modules/ui-kit/components/multi-input/multi-input.component';
import { FormControlService } from 'src/app/service/form-control.service';
import { ToastService } from 'src/app/service/toast.service';
import { PublicService } from '../../public.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],

})
export class ContactUsComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  phone = MultiInputMode.PHONE;
  email = MultiInputMode.EMAIL;

  constructor(
    private publicService: PublicService,
    private toastService: ToastService,
    private ref: DynamicDialogRef,
    private formControlService: FormControlService
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      name: this.formControlService.getNameControl(),
      email: this.formControlService.getMultiInputControl(),
      phone_number: this.formControlService.getMultiInputControl(),
      message: this.formControlService.getStringTypeFormControl({ maxLength: 500 })
    });
  }

  onCloseButtonClick() {
    this.ref.close();
  }
  
  onSubmit() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.form.valid) {
      this.submitted = true;
      const payload = { ...this.form.value };
      this.publicService.save(payload)
        .pipe(finalize(() => this.submitted = false),)
        .subscribe((res: any) => {
          this.toastService.success({ message: res.message, sticky: true });
        });
    }
  }

  get controls() { return this.form.controls; }
}
