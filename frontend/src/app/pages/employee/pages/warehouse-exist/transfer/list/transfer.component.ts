import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AddPaymentComponent } from '../../components/add-payment/add-payment.component';
import { IProductTransfer, TransferService } from '../transfer.service';
import { ViewPaymentComponent } from '../../components/view-payment/view-payment.component';
import { GenerateInvoiceComponent } from '../../components/generate-invoice/generate-invoice.component';
import { SaleService } from '../../sale/sale.service';
import { BaseList } from 'src/app/classes/base-list';
import { ActivatedRoute } from '@angular/router';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html'
})
export class TransferComponent  extends BaseList<IProductTransfer> implements OnInit {
  ref: any;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  tableColumnsCount: number = 11;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Reference', style: 'min-width:12rem;', type: 'numeric' },
    {key: 'product', label: 'Product', style: 'min-width:12rem;'},
    {key: 'date', label: 'Date', style: 'min-width:10rem;', type:'date'},
    {key: 'from_warehouse', label: 'F.Warehouse', style: 'min-width:14rem;'},
    {key: 'to_warehouse', label: 'To Warehouse', style: 'min-width:14rem;'},
    {key: 'status', label: 'Status', style: 'min-width:10rem;', hasCenter: true },
    {key: 'payment_status', label: 'Payment Status', style: 'min-width:14rem;' , hasCenter: true},
    {key: 'grand_total', label: 'Grand Total', style: 'min-width:12rem;'},
    {key: 'paid', label: 'Paid', style: 'min-width:9rem;'},
    {key: 'due', label: 'Due', style: 'min-width:8rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];


  tableActions= [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      routerLink: './$id'
    },
    {
      label: 'Generate Invoice',
      icon: 'pi pi-book',
      click: this.generateInvoice.bind(this),
    },
    {
      label: 'Add Payment',
      icon: 'pi pi-dollar',
      click: this.addPayment.bind(this),
    },
    {
      label: 'view Payment',
      icon: 'pi pi-money-bill',
      click: this.viewPayment.bind(this),
    }
   ];

  constructor(
    private transferService: TransferService,
    private saleService: SaleService,
    public dialogService: DialogService,
    public activatedRoute: ActivatedRoute,
  ) { 
    super();
  }

  
  ngOnInit() {
    this.onInIt();
  }

  fetch() {
    return this.transferService.list()
  }

  delete(id) {
    return this.transferService.delete(id);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  generateInvoice() {
    const ref = this.dialogService.open(GenerateInvoiceComponent, {
      header: 'Invoive',
      dismissableMask: true,
      styleClass: 'w-9 md:w-8',
      data: {
        selectedRow: this.selectedRow
      }
    });
    this.ref.onClose.subscribe((isSubmitted) => {
      if (isSubmitted) {
      }
    });
  }

  addPayment() {
    const ref = this.dialogService.open(AddPaymentComponent, {
      header: 'Add Payment',
      dismissableMask: true,
      styleClass: 'w-9 md:w-6',
      data: {
        selectedRow: this.selectedRow,
        savePayment: (data, id) => {
          return this.saleService.savePayment(data, id)
        },
        onClose: (saved) => {
          if (saved) {
            this.fetchList();
          }
        }
      }
    });
    this.ref.onClose.subscribe((isSubmitted) => {
      if (isSubmitted) {
        this.fetchList();
      }
    });
  }

  viewPayment() {
   const ref= this.dialogService.open(ViewPaymentComponent, {
      header: 'View Payment',
      dismissableMask: true,
      styleClass: 'w-9 md:w-8',
      data: {
        selectedRow: this.selectedRow
      }
    });
    this.ref.onClose.subscribe((isSubmitted) => {
      if (isSubmitted) {
      }
    });
  }
}