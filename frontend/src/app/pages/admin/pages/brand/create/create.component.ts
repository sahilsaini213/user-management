import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { UikitImageComponent } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';
import { FormControlService } from 'src/app/service/form-control.service';
import { ToastService } from 'src/app/service/toast.service';
import { BrandService, IBrand } from '../brand.service';

@Component({
  selector: 'brand-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateBrandComponent implements OnInit, AfterViewInit {
  brandForm: FormGroup;
  brand: IBrand = {};
  submitted = false;
  isDestroy = false;
  isNew = true;
  @ViewChild(UikitImageComponent) uikitImageComponent: UikitImageComponent;
  constructor(
    public brandService: BrandService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private formControlService: FormControlService
  ) { }

  ngOnInit() {
    this.isNew = this.config.data.isNew;
    this.brand = this.config.data.brand || {};
    this.formInit(this.brand);
  }

  ngAfterViewInit(): void {
    this.uikitImageComponent.setPreUploadedImages(this.isNew ? [] : [this.brand.image]);
  }

  formInit(brand?: IBrand) {
    this.brandForm = new FormGroup({
      name: this.formControlService.getNameControl(brand?.name)
    });
  }

  onSubmit() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.brandForm.valid) {
      this.submitted = true;
      const payload = { ...this.brandForm.getRawValue(), image: this.brand.image };
      const categoryReq = this.isNew ? this.brandService.create(payload) : this.brandService.update(this.brand.id, payload)        
      categoryReq .subscribe((res: any) => {
        this.toastService.success({ message: 'Brand has been created successfully.', sticky: false });
          this.onClose(true);
        });
    }
  }

  onImageSelectionChange(images) {
    this.brand.image = images[0];
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

  onClose(boolean = false) {
    this.ref.close(boolean);
  }

  get controls() { return this.brandForm.controls; }

}
