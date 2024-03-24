import { Component, OnInit, ViewChild } from '@angular/core';
import { HssTreeComponent } from 'src/app/modules/ui-kit/components/hss-tree/hss-tree.component';
import { MODULES } from 'src/app/pages/admin/pages/role-management/permissions/permissions.const';
import { RoleManagementService } from '../role-management.service';
import { deepCopy } from '@firebase/util';
import { IUIKitDropdown } from 'src/app/modules/ui-kit/components/uikit-dropdown/uikit-dropdown.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  selectedRole: any;
  roles: any;
  modules = deepCopy(MODULES);
  loading = false;
  hasAnyChange = false;
  roleFieldConfig: IUIKitDropdown = {
    label: 'role',
    service: this.roleService
  };
  @ViewChild(HssTreeComponent) hssTreeComponent: HssTreeComponent;
  constructor(
    private roleService: RoleManagementService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.roleService.getList()
      .subscribe(res => {
        this.roles = res.list;
        this.loading = false;
      })
  }

  roleUpdated() {
    this.hasAnyChange = false;
    if (this.selectedRole?.permissions) {
      this.hssTreeComponent.updateSelectionByJson(this.selectedRole.permissions);
    } else {
      this.hssTreeComponent.reset();
    }
  }

  selectionChanged(res) {
    this.hasAnyChange = true;
  }

  savePermissions() {
    this.loading = true;
    const selection = this.hssTreeComponent.getJsonSelection();
    this.selectedRole.permissions = selection;
    this.roleService.update(this.selectedRole.id, this.selectedRole).subscribe(res => {
      this.loading = false;
      this.hasAnyChange = false;
    })
    this.hssTreeComponent.reset();
    this.selectedRole = "";
  }

}
