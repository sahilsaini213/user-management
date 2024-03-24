import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ISupplier, SupplierService } from '../supplier.service';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseList<ISupplier>  implements OnInit {
  
  tableColumnsCount: number = 8;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'code', label: 'Supplier Code', style: 'min-width:13rem;'},
    {key: 'name', label: 'Name', style: 'min-width:11rem;'},
    {key: 'email', label: 'Email', style: 'min-width:12rem;'},
    {key: 'phone_number', label: 'Phone Number', hasSorting: false, hasFilter: false},
    {key: 'company', label: 'Company', style: 'min-width:13rem;'},
    {key: 'address', label: 'Address', style: 'min-width:11rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];


  constructor(
    private supplierService: SupplierService,
    public dialogService: DialogService,
    public activatedRoute: ActivatedRoute
  ) { 
    super();
  }

  ngOnInit() {
    this.onInIt();
  }

  fetch() {
    return this.supplierService.list()
  }

  delete(id) {
    return this.supplierService.delete(id);
  }


  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
