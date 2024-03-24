import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { IWarehouse, WAREHOUSE_STATUSES } from 'src/app/pages/employee/employee.model';
import { WarehouseManagementService } from '../warehouse-management.service';

@Component({
  selector: 'warehouse-managementlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class WarehousemanagementListComponent extends BaseList<IWarehouse> implements OnInit {

  tableColumnsCount: number = 7;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'name', label: 'Name', style: 'min-width:14rem;'},
    {key: 'email', label: 'Email', style: 'min-width:10rem;'},
    {key: 'phone_number', label: 'Phone Number', style: 'min-width:10rem;', hasSorting: false, hasFilter: false},
    {key: 'status', label: 'Status', style: 'min-width:10rem;', hasCenter: true, options: WAREHOUSE_STATUSES},
    {key: 'address', label: 'Address', style: 'min-width:14rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];

  constructor(
    private employeeService: WarehouseManagementService,
    public dialogService: DialogService,
    public activatedRoute: ActivatedRoute
  ) { 
    super();
  }

  
  ngOnInit() {
    this.onInIt();
  }

  fetch() {
    return this.employeeService.list()
  }

  delete(id) {
    return this.employeeService.delete(id);
  }


  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  
}
