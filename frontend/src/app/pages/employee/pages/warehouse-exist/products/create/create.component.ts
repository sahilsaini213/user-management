import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/app/classes/base-form';
import { IImage, UikitImageComponent } from 'src/app/modules/ui-kit/components/uikit-image/uikit-image.component';
import { ICategory, ISubCategory, ProductCategoryService } from 'src/app/pages/admin/pages/product-category/product-category.service';
import { WarehouseManagementService } from 'src/app/pages/admin/pages/warehouse-management/warehouse-management.service';
import { ICountry } from 'src/app/pages/admin/pages/warehouse-management/warehouse.const';
import { IWarehouse } from 'src/app/pages/employee/employee.model';
import { EmployeeService } from 'src/app/pages/employee/employee.service';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { BrandService, IBrand } from '../../../../../admin/pages/brand/brand.service';
import { IProduct, ProductsService } from '../products.service';

@Component({
  selector: 'product-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseForm implements OnInit {
  productImages: IImage[] = [];
  units: any[];
  brands: IBrand[];
  categories: ICategory[];
  subCategories: ISubCategory[];
  warehouses: IWarehouse[]
  originCountry: ICountry[];
  @ViewChild(UikitImageComponent) uikitImageComponent: UikitImageComponent;
  priceDifferenceControls = ['price_difference_with_warehouse', 'different_price'];

  constructor(
    private productsService: ProductsService,
    private categoryService: ProductCategoryService,
    private brandService: BrandService,
    private warehouseService: WarehouseManagementService,
    private employeeService: EmployeeService,
    private formControlService: FormControlService,
    private toastService: ToastService,
    private routeService: RouteService,
    public activatedRoute: ActivatedRoute
  ) {
    super(activatedRoute);
  }

  ngOnInit(): void {
    this.onInIt();
    this.categoryService.list().subscribe((res) => {
      this.categories = res.list;
      if (!this.isNew) {
        this.handleCategoryChange();
      }
    });
    this.productsService.getUnits().subscribe((res: any) => {
      this.units = res;
    });
    this.brandService.list().subscribe((res) => {
      this.brands = res.list;
    });
    this.warehouseService.list().subscribe((res) => {
      const defaultWarehouseId = this.employeeService.getDefaultWarehouse().id
      this.warehouses = (res.list).filter(warehouse => warehouse.id !== defaultWarehouseId);
    });
    this.warehouseService.countrylist().subscribe((res: any) => {
      this.originCountry = res;
    });
  }

  handleCategoryChange(reset = false) {
    if (reset) {
      this.form.patchValue({ sub_category_id: '', brand_id: '' });
    }
    this.subCategories = this.categories?.find(category => category.id == this.productCategory).sub_categories;
  }

  getFormEditDetail(id) {
    return this.productsService.findById(id);
  }

  formInit(product: Partial<IProduct> = {}) {
    let productForm = new FormGroup({
      name: this.formControlService.getNameControl(product.name),
      origin_country_id: this.formControlService.getFormControl(product.origin_country_id, [Validators.required]),
      category_id: this.formControlService.getFormControl(product.category_id, [Validators.required]),
      sub_category_id: this.formControlService.getFormControl(product.sub_category_id, [Validators.required]),
      brand_id: this.formControlService.getFormControl(product.brand_id, [Validators.required]),
      code: this.formControlService.getFormControl(product.code, [Validators.required]),
      unit_id: this.formControlService.getFormControl(product.unit_id, [Validators.required]),
      variant: this.formControlService.getFormControl(product.variant),
      stock: this.formControlService.getFormControl(product.stock),
      price_per_unit: this.formControlService.getFormControl(product.price_per_unit, [Validators.required]),
      price_difference: this.formControlService.getFormControl(product.price_difference),
      date_expired: this.formControlService.getFormControl(product.date_expired),
      promotional_sale: this.formControlService.getFormControl(product.promotional_sale),
      multi_variant: this.formControlService.getFormControl(product.multi_variant),
      imei_code: this.formControlService.getFormControl(product.imei_code)
    });

    if (!this.isNew) {
      if (product?.price_difference) {
        this.onDifferentPrice(product, productForm);
      }
      this.uikitImageComponent?.setPreUploadedImages(product.images || []);
    }
    return productForm;
  }

  onDifferentPrice(product: IProduct = {}, form) {
    this.priceDifferenceControls.forEach((key) => {
      if (this.priceDifference || product.price_difference) {
        form.addControl(
          key,
          this.formControlService.getFormControl(product[key], [])
        )
      } else {
        form.removeControl(key);
      }
    })
  }

  onImageSelectionChange(images: IImage[]) {
    this.productImages = images;
  }

  ngAfterViewInit(): void {
    this.uikitImageComponent.setPreUploadedImages(this.isNew ? [] : this.productImages);
  }

  onSubmit() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.form.valid) {
      this.submitted = true;
      const payload = { ...this.form.value, images: this.productImages };
      const productReq = this.isNew ? this.productsService.createNew(payload) : this.productsService.updateById(payload, this.id);
      productReq.subscribe((res: any) => {
        this.toastService.success({ message: res.message, sticky: false });
        this.routeService.navigateWithPreserve('../', { relativeTo: this.activatedRoute });
      });
    }
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

  get productCategory() { return this.form?.get('category_id').value; }
  get priceDifference() { return this.form?.get('price_difference')?.value; }

}
