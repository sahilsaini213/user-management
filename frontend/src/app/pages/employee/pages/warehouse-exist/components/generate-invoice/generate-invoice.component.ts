import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InvoiceSummaryComponent } from '../invoice-summary/invoice-summary.component';

@Component({
  selector: 'generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  selectedRow: any[];
  @ViewChild(InvoiceSummaryComponent) childComponent: InvoiceSummaryComponent;

  constructor(
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    if (this.config.data) {
      this.selectedRow = this.config.data.selectedRow;
    }
  }
}
