import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/app/service/route.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent implements OnInit {
  @Input() actions = [];
  @Input() activatedRoute: ActivatedRoute;
  @Input() selectedRow: any;
  @Output() onOpenMenu = new EventEmitter();

  constructor(
    private routeService: RouteService, 
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  openMenu(event, actionMenu) {
    this.onOpenMenu.emit();
    actionMenu.toggle(event);
  }

  onMenuItemClick({option}) {
    if(option.onConfirm) {
      this.confirmation(option);
    } else if (option?.click) {
      option.click();
    }
     else if (option?.routerLink && this.activatedRoute) {
      this.routeService.navigateWithPreserve(
        option.routerLink.replace('$id', this.selectedRow.id), 
        { relativeTo: this.activatedRoute }
      );
    }
  }

  confirmation(option) {
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: 'Want to delete?',
      dismissableMask: true,
      styleClass: 'w-9 md:w-5',
      data: {
        onConfirm: option.onConfirm
      }
    });
    ref.onClose.subscribe();
  }

}
