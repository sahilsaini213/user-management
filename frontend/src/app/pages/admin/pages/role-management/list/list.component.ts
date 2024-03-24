import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { CreateComponent } from '../create/create.component';
import { IRole, RoleManagementService } from '../role-management.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RolelistComponent extends BaseList<IRole> implements OnInit {
  tableColumnsCount = 4;
  ref: DynamicDialogRef;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'name', label: 'Name', style: 'min-width:11rem;'},
    {key: 'message', label: 'Description', style: 'min-width:12rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];

  constructor(
    public dialogService: DialogService,
    private roleService: RoleManagementService,
  ) {
    super();
    delete this.tableActions[0].routerLink;
    this.tableActions[0] = {
      ...this.tableActions[0],
      click: this.showAddRoleForm.bind(this)
    }
  }

  ngOnInit() {
    this.onInIt()
  }

  fetch() {
    return this.roleService.list();
  }

  delete(id) {
     return this.roleService.delete(id);
  }

  showAddRoleForm(isNew) {
    if (isNew) {
      this.selectedRow = null;
    }
    const ref = this.dialogService.open(CreateComponent, {
      styleClass: 'w-9 md:w-6',
      header: 'Add Role',
      dismissableMask: true,
      data: {
        selectedRole: this.selectedRow
      },
    });
    ref.onClose.subscribe((isSubmitted) => {
      if (isSubmitted) {
        this.fetchList();
      }
    });
  }

}
