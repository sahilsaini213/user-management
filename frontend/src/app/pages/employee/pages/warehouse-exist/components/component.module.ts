import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { QSharedModule } from "src/app/modules/shared/shared.module"
import { InvoiceSummaryComponent } from "./invoice-summary/invoice-summary.component";
import { PaymentSummaryComponent } from "./payment-summary/payment-summary.component";
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';

@NgModule({
    declarations: [
        PaymentSummaryComponent,
        InvoiceSummaryComponent,
        GenerateInvoiceComponent
    ],
    imports: [
        CommonModule,
        QSharedModule,
    ],
    exports: [
        PaymentSummaryComponent,
        InvoiceSummaryComponent
    ]
})
export class ComponentModule { }