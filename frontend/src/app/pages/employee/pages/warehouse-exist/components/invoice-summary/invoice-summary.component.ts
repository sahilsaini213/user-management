import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { BaseList, ITableList } from 'src/app/classes/base-list';
import { TransferService } from '../../transfer/transfer.service';

@Component({
  selector: 'invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss']
})
export class InvoiceSummaryComponent extends BaseList<any> implements OnInit, OnChanges {
  tableColumnsCount: number = 10;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  @Input() selectedItems: any[];
  @Input() total_amount = 0;
  @Input() tax = 0;
  @Input() discount = 0;
  @Input() shipping = 0;
  @Input() grand_total = 0;

  billingMenu = [
    {
      name: "Total Amount",
      data: this.total_amount,
    },
    {
      name: "Order Tax",
      data: this.chargesCalculator(this.tax),
    },
    {
      name: "Discount",
      data: this.chargesCalculator(this.discount)
    },
    {
      name: "Shipping",
      data: this.chargesCalculator(this.shipping)
    },
    {
      name: "Grand Total",
      data: this.grand_total
    }
  ]

  constructor(
    public activatedRoute: ActivatedRoute,
    public transferService: TransferService,
    ) {
    super();
  }

  ngOnInit() {
    this.onInIt();
  }

  fetch(): Observable<ITableList<any>> {
    return this.transferService.list()
  }
  delete(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.billingMenu
  }


  chargesCalculator(value = 0) {
    let result = (this.total_amount * value) / 100;
    this.grand_total += result;

    return (`${result} (${value}%)`);
  }

}