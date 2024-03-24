import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { BrandService, IBrand } from './brand.service';
import { CreateBrandComponent } from './create/create.component';

@Component({
  selector: 'brand-list',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent extends BaseList<IBrand> implements OnInit {
  tableColumnsCount = 4;
  ref: DynamicDialogRef;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'logo', label: 'Logo', style: 'min-width:10rem;'},
    {key: 'name', label: 'Name', style: 'min-width:10rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];

  constructor(
    private brandService: BrandService,
    private cdref: ChangeDetectorRef,
    public dialogService: DialogService
  ) {
    super();
      delete this.tableActions[0].routerLink;
      this.tableActions[0] = {
        ...this.tableActions[0],
        click: this.showAddBrandForm.bind(this)
      }
   }

   ngOnInit() {
    this.onInIt()
  }

  fetch() {
    return this.brandService.list();
  }

  delete(id) {
     return this.brandService.delete(id);
  }

  showAddBrandForm(isNew?) {
    if (isNew) {
      this.selectedRow = null;
    }
    const ref = this.dialogService.open(CreateBrandComponent, {
      styleClass: 'w-9 md:w-6',
      header: 'Brand',
      dismissableMask: true,
      data: {
        brand: this.selectedRow,
        isNew
      }
    });
    ref.onClose.subscribe((isSubmitted) => {
      if (isSubmitted) {
        this.fetchList();
      }
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
