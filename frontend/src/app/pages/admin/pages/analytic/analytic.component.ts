import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { QSkeletonType } from 'src/app/modules/ui-kit/components/q-skeleton/q-skeleton.component';
import { LOSS_PROFIT_DATA, OVERALL_REPORT_DATA, STOCK_ANALYSIS_DATA } from 'src/app/pages/employee/pages/warehouse-exist/analytic/analytics-cards';
import { AdminService } from '../../admin.service';
import { ADMIN_DASHBOARD } from './analytics-cards';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit, OnDestroy {
  skeletonType = QSkeletonType.CARD;
  submitted = false;
  items: MenuItem[];
  connectedToStore = false;
  activities = ADMIN_DASHBOARD;
  isDestroy = false;
  lossProfitOptions: any;
  lossProfit = LOSS_PROFIT_DATA;
  stockAnalysisOptions: any;
  stockAnalysis = STOCK_ANALYSIS_DATA;
  overallReportOptions: any
  overallReport = OVERALL_REPORT_DATA;
  subscriptionRef: Subscription;
  summary = {};
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  loading = false;


  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getSummary().subscribe( summary => {
     this.summary = summary;
    })
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
    this.subscriptionRef?.unsubscribe();
  }

}
