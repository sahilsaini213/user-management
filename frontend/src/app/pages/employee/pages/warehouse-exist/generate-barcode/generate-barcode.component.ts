import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { FormControlService } from 'src/app/service/form-control.service';
import { RouteService } from 'src/app/service/route.service';
import { ToastService } from 'src/app/service/toast.service';
import { IProduct} from '../products/products.service';
import { GenerateBarcodeService } from './generate-barcode.service';

@Component({
  selector: 'generate-barcode',
  templateUrl: './generate-barcode.component.html',
  styleUrls: ['./generate-barcode.component.scss']
})
export class GenerateBarcodeComponent implements OnInit {
  barcodeForm: FormGroup;
  submitted: boolean = false;
  isDestroy = false;
  barcodeId = null;
  totalRecords: number = 0;
  products: IProduct;

  paper_Sizes = [
    {
      id: 1,
      size: "50 mm (1.95 Inch)"
    },
    {
      id: 2,
      size: "40 mm (1.65 Inch)"
    },
    {
      id: 3,
      size: "30 mm (1.35 Inch)"
    },
  ]

  constructor(
    private barcodeService: GenerateBarcodeService,
    private formControlService: FormControlService,
    private toastService: ToastService,
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.barcodeForm = new FormGroup({
      name: this.formControlService.getNameControl(),
      paper_size: this.formControlService.getFormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    this.toastService.clear();
    if (this.submitted) return;
    if (this.barcodeForm.valid) {
      this.submitted = true;
      const payload = { ...this.barcodeForm.value };
      this.barcodeService.updateBarcode(this.barcodeId, payload)
        .pipe(
          finalize(() => this.submitted = false),
        )
        .subscribe((res: any) => {
          this.toastService.success({ message: res.message, sticky: true });
          this.routeService.navigateWithPreserve('../', {relativeTo: this.activatedRoute});
        });
    }
  }

  onPrint(){
  }

  get controls() { return this.barcodeForm.controls; }

  ngOnDestroy(): void {
    this.isDestroy = true;
  }

}

