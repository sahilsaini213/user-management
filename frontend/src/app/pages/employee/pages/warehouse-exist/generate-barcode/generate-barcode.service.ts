import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateBarcodeService {

  constructor(private http: HttpClient) { }

  updateBarcode(barcodeId, barcodeData) {
    return this.http[barcodeId ? 'put' : 'post'](`generate-barcode/`, barcodeData);
  }
}
