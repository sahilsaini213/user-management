import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { of } from 'rxjs';
import { BaseList } from 'src/app/classes/base-list';
import { RouteService } from 'src/app/service/route.service';
import { TransferService } from '../../transfer/transfer.service';

@Component({
  selector: 'view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent extends BaseList<any> implements OnInit {
  paymentDetail:any = [];
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  tableColumnsCount: number = 5;
  referenceId = null;

  constructor(
    public config: DynamicDialogConfig,
    public activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    if (this.config.data) {
      this.selectedRow = this.config.data.selectedRow;
      this.referenceId = this.config.data.selectedRow.reference;
    }
    this.onInIt();
  }

  fetch() {
    return of()
  }

  delete(id) {
    return of()
  }

  ngAfterContentChecked() {
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}