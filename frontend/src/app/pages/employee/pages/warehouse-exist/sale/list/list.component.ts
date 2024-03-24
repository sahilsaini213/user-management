import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseList } from 'src/app/classes/base-list';
import { USERS_STATUSES } from 'src/app/modules/q-auth/q-auth-model';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { PAYMENT_STATUSES } from 'src/app/pages/employee/employee.model';
import { AddPaymentComponent } from '../../components/add-payment/add-payment.component';
import { GenerateInvoiceComponent } from '../../components/generate-invoice/generate-invoice.component';
import { ViewPaymentComponent } from '../../components/view-payment/view-payment.component';
import { ISale, SaleService } from '../sale.service';

@Component({
  selector: 'sale-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SaleListComponent extends BaseList<ISale> implements OnInit {
  ref: any;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  tableColumnsCount: number = 12;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Reference', style: 'min-width:12rem;', type: 'numeric' },
    {key: 'product', label: 'Product', style: 'min-width:10rem;'},
    {key: 'date', label: 'Date', style: 'min-width:10rem;', type: 'date'},
    {key: 'suppliers', label: 'Supplier', style: 'min-width:11rem;'},
    {key: 'warehouses', label: ' Warehouse', style: 'min-width:14rem;'},
    {key: 'status', label: 'Status', style: 'min-width:10rem;', hasCenter: true, },
    {key: 'customer', label: 'Customer', style: 'min-width:11rem;'},
    {key: 'payment_status', label: 'Payment Status', style: 'min-width:14rem;' , hasCenter: true,},
    {key: 'grand_total', label: 'Grand Total', style: 'min-width:12rem;'},
    {key: 'paid', label: 'Paid', style: 'min-width:9rem;'},
    {key: 'due', label: 'Due', style: 'min-width:8rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];

  tableActions = [
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
    private saleService: SaleService,
    private cdref: ChangeDetectorRef,
    public dialogService: DialogService,
    public activatedRoute: ActivatedRoute,
  ) {
    super();
   }

  ngOnInit() {
    this.onInIt();
  }

  fetch() {
    return this.saleService.list()
  }

  delete(id) {
    return this.saleService.delete(id);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  generateInvoice() {
    this.ref = this.dialogService.open(GenerateInvoiceComponent, {
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
    this.ref = this.dialogService.open(AddPaymentComponent, {
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
    this.ref = this.dialogService.open(ViewPaymentComponent, {
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