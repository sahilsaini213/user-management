import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { BaseList } from 'src/app/classes/base-list';
import { IUser, USERS_STATUSES } from 'src/app/modules/q-auth/q-auth-model';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { AdminService } from '../admin.service';


@Component({
  selector: 'manage-adminsList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ManageAdminListComponent extends BaseList<IUser> {
  tableColumnsCount: number = 6;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'first_name', label: 'Name', style: 'min-width:12rem;'},
    {key: 'email', label: 'Email', style: 'min-width:10rem;'},
    {key: 'phone_number', label: 'Phone Number', style: 'min-width:10rem;', hasSorting: false, hasFilter: false},
    {key: 'status', label: 'Status', style: 'min-width:10rem;', hasCenter: true, options: USERS_STATUSES},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];
  
  constructor(private adminService: AdminService,
    private cdref: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.onInIt();
  }

  fetch() {
    return this.adminService.list();
  }

  delete(id) {
    return this.adminService.delete(id);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
