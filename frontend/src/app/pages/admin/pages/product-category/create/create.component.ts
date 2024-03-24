import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, takeWhile } from 'rxjs';
import { QThemeConfig } from 'src/app/modules/q-theme';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { FormControlService } from 'src/app/service/form-control.service';
import { ToastService } from 'src/app/service/toast.service';
import { ICategory, ProductCategoryService } from '../product-category.service';

@Component({
  selector: 'category-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  categoryform: FormGroup;
  config: QThemeConfig;
  isDestroy = false;
  loading = false;
  category: ICategory;
  submitted: boolean = false;
  isNew = true;
  categoryId = null;
  selectedcategory;
  activatedRouteParamsSubscribe: Subscription;

  constructor(
    private formControlService: FormControlService,
    private categoryService: ProductCategoryService,
    private ref: DynamicDialogRef,
    private dialogconfig: DynamicDialogConfig,
    private toastService: ToastService,
    private qThemeService: QThemeService
  ) {
    this.selectedcategory = this.dialogconfig.data?.selectedcategory;
    this.categoryId = this.dialogconfig.data?.selectedcategory?.id;
    if (this.categoryId) {
      this.isNew = false;
    }
    this.paramsUpdated();
  }

  paramsUpdated() {
    if (this.isNew) {
      this.formInit();
    } else {
      this.formInit(this.selectedcategory);
    }
  }

  formInit(category: any = {}) {
    this.categoryform = new FormGroup({
      category: this.formControlService.getNameControl(category.category),
      message: this.formControlService.getFormControl(category.message, [Validators.required]),
      sub_categories: this.subCategoryFormInit(category?.sub_categories),
    });
  }

  subCategoryFormInit(sub_categories = [{name: '', id: Date.now()}]): FormArray {
    const controls = sub_categories.map((subCategory) => { 
      return this.getSubCategory(subCategory);
    });
    return new FormArray(controls);
  }

  private getSubCategory(subCategory?) {
    return new FormGroup({
      id: this.formControlService.getFormControl(subCategory?.id),
      name: this.formControlService.getNameControl(subCategory?.name)
    })
  }

  get subCategoryFormArray(): FormArray {
    return this.categoryform?.get('sub_categories') as FormArray;
  }

  addSubCategory() {
    this.subCategoryFormArray.push(this.getSubCategory());
  }

  removeSubCategory(index) {
    this.subCategoryFormArray.removeAt(index);
  }

  onSubmit() {
    this.toastService.clear();
    this.submitted = true;
    const payload = { ...this.categoryform.value };
    const categoryReq = !this.categoryId ? this.categoryService.create(payload) : this.categoryService.update(this.categoryId, payload)
    categoryReq .subscribe (() =>  {
      this.toastService.success({ message: 'Your role has been successfully Created.', sticky: false });
      this.loading = false;
      this.onClose(true);
    });
  }
  
  ngOnInit(): void {
    this.config = this.qThemeService.config;
    this.qThemeService.configUpdate$
      .pipe(takeWhile(() => !this.isDestroy))
      .subscribe(config => {
        this.config = config;
      });
  }

  onClose(submitted = false) {
    this.ref.close(submitted);
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

  get controls() { return this.categoryform.controls; }
  get name() { return this.categoryform.get('name'); }
  get message() { return this.categoryform.get('message'); }

}
