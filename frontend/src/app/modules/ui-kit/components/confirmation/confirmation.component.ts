import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'product-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  
  onConfirm: () => Promise<boolean>;
  submitted = false;
  
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { 
    this.onConfirm = this.config.data?.onConfirm;
  }

  ngOnInit(): void {
  }

  async confirmDeleteItem() {
    if (this.onConfirm) {
      this.submitted = true;
      await this.onConfirm();
      this.submitted = false;
    }
    this.onClose(true)
  }

  onClose(afterSave = false) {
    this.ref.close(afterSave);
  }
}