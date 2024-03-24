import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { USERS_STATUSES } from 'src/app/modules/q-auth/q-auth-model';
import { QThemeConfig } from 'src/app/modules/q-theme';
import { QSkeletonType } from 'src/app/modules/ui-kit/components/q-skeleton/q-skeleton.component';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { ArrayUtil } from 'src/app/utils/array.utils';
import { SuperAdminService } from '../../super-admin.service';

@Component({
    selector: 'app-analytic',
    templateUrl: './analytic.component.html',
    styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit, OnDestroy {
    skeletonType = QSkeletonType.CARD;
    loading = false;
    items: MenuItem[];
    config: QThemeConfig;
    connectedToStore = false;
    isDestroy = false;
    subscription: Subscription;
    admins: any[] = ArrayUtil.fillWithEmpty(6);
    totalRecords = 0;
    total_warehouses = 0;
    columns: Partial<IUikitColumn>[] = [
        {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
        {key: 'first_name', label: 'Name', style: 'min-width:10rem;'},
        {key: 'warehouse_count', label: 'Total Warehouses', style: 'min-width:10rem;'},
        {key: 'users_count', label: 'Total Users', style: 'min-width:10rem;'},
        {key: 'phone_number', label: 'Phone Number', style: 'min-width:10rem;', hasSorting: false, hasFilter: false},
        {key: 'status', label: 'Status', style: 'min-width:10rem;', hasCenter: true, options: USERS_STATUSES},
      ];

    activities = [{
        heading: "Admins",
        key: this.totalRecords,
        icon: "pi pi-users"
    },
    {
        heading: "Warehouses",
        key: this.total_warehouses,
        icon: "pi pi-building"
    }]

    constructor(
        public superAdminService: SuperAdminService,
    ) { }

    ngOnInit() {
        this.loadAdmins();
    }

    loadAdmins() {
        this.loading = true;
        this.superAdminService.getsummary()
            .subscribe((res: any) => {
                this.loading = false;
                this.admins = res.list;
                this.totalRecords = res.adminsCount;
                this.total_warehouses = res.totalWarehouseCount;
            });
    }

    ngOnDestroy(): void {
        this.isDestroy = true;
    }
}
