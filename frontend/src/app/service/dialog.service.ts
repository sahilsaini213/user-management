import { Injectable, Type } from "@angular/core";
import { DialogService as PrimeNGDailogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor (
        private dialogService: PrimeNGDailogService
    ){}

    openHeaderLess(component: Type<any>, config?: DynamicDialogConfig): DynamicDialogRef {
        return this.dialogService.open(component, {...config, showHeader: false, dismissableMask: true, styleClass: `p-dialog-headerless ${config?.styleClass}`});
    }

    open(component: Type<any>, config?: DynamicDialogConfig): DynamicDialogRef {
        return this.dialogService.open(component, config);
    }
}