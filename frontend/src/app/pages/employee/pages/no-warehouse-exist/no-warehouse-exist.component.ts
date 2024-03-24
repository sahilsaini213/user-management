import { Component, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseDashboard } from 'src/app/classes/base-dashboard';
import { QAuthService } from 'src/app/modules/q-auth/q-auth.service';
import { QThemeService } from 'src/app/modules/q-theme/q-theme.service';
import { TopbarData } from 'src/app/modules/ui-kit/components/topbar/topbar.component';
import { DialogService } from 'src/app/service/dialog.service';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-no-warehouse-exist',
  templateUrl: './no-warehouse-exist.component.html',
  styleUrls: ['./no-warehouse-exist.component.scss']
})
export class NoWarehouseExistComponent extends BaseDashboard implements OnInit {
  userName = '';
  navbar: TopbarData = {
    items: [],
    profileItems: []
  };
  dialogRef: DynamicDialogRef;
  constructor(
    public renderer: Renderer2,
    public qThemeService: QThemeService,
    public qAuthService: QAuthService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public employeeService: EmployeeService
  ) {
    super(renderer, qThemeService, qAuthService);
  }


  async ngOnInit() {
    super.onInit();
    const res = await this.qAuthService.me();
    if (res) {
      const { first_name, last_name, email } = res.user;
      this.userName = `${first_name} ${last_name || ''}`;
    }
  }

  async loadMenuData() {

  }

  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
