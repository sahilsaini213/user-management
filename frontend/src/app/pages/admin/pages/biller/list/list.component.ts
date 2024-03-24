import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { BillerService, IBiller } from '../biller.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseList<IBiller> implements OnInit {
  tableColumnsCount: number = 7;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'billercode', label: 'Biller Code', style: 'min-width:12rem;'},
    {key: 'name', label: 'Name', style: 'min-width:10rem;'},
    {key: 'email', label: 'Email', style: 'min-width:10rem;'},
    {key: 'phone_number', label: 'Phone Number', style: 'min-width:10rem;', hasSorting: false, hasFilter: false},
    {key: 'address', label: 'Address', style: 'min-width:12rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];

  constructor(
    private billerService: BillerService,
    public activatedRoute: ActivatedRoute,
    public dialogService: DialogService
  ) { 
    super();
  }

  ngOnInit() {
    this.onInIt();
  }

  fetch(query) {
    return this.billerService.list(query)
  }

  delete(id) {
    return this.billerService.delete(id);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }


}
