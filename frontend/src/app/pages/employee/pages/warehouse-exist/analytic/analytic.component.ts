import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { QSkeletonType } from 'src/app/modules/ui-kit/components/q-skeleton/q-skeleton.component';
import { IWarehouse } from '../../../employee.model';
import { EmployeeService } from '../../../employee.service';
import { LOSS_PROFIT_DATA, STOCK_ANALYSIS_DATA, OVERALL_REPORT_DATA, WAREHOUSE_DASHBOARD } from './analytics-cards';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-analytic',
    templateUrl: './analytic.component.html',
    styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit, OnDestroy {
    skeletonType = QSkeletonType.CARD;
    submitted = false;
    connectedToStore = false;
    activities: any = WAREHOUSE_DASHBOARD;
    isDestroy = false;
    subscriptionRef: Subscription;
    summary = {};
    lossProfitOptions: any;
    lossProfit = LOSS_PROFIT_DATA;
    stockAnalysisOptions: any;
    stockAnalysis = STOCK_ANALYSIS_DATA;
    overallReportOptions: any
    overallReport = OVERALL_REPORT_DATA;

    constructor(
        private employeeService: EmployeeService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this.subscriptionRef = this.employeeService.defaultWarehouseSelected$
            .subscribe((warehouse: IWarehouse) => {
                if (warehouse) {
                    this.loadSummary();
                }
            })
    }

    loadSummary() {
        this.submitted = true;
        this.dashboardService.getSummary()
            .pipe(finalize(() => this.submitted = false))
            .subscribe((summary) => {
                this.activities = WAREHOUSE_DASHBOARD;
                this.summary = summary;
            });
    }

    ngOnDestroy(): void {
        this.isDestroy = true;
        this.subscriptionRef?.unsubscribe();
    }
}