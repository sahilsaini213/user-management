import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { ArrayUtil } from 'src/app/utils/array.utils';
import { CreateComponent } from '../create/create.component';
import { ICategory, ProductCategoryService } from '../product-category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseList<ICategory> implements OnInit {

  tableColumnsCount = 5;
  ref: DynamicDialogRef;
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'category', label: ' Category', style: 'min-width:11rem;'},
    {key: 'sub_categories', label: 'Sub-Category', style: 'min-width:13rem;'},
    {key: 'message', label: ' Items', style: 'min-width:12rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];

  constructor(
    private productcategoryService: ProductCategoryService,
    public dialogService: DialogService,
    public activatedRoute: ActivatedRoute,) { 
      super();
      delete this.tableActions[0].routerLink;
      this.tableActions[0] = {
        ...this.tableActions[0],
        click: this.showAddRoleForm.bind(this)
      }
    }


    ngOnInit() {
      this.onInIt()
    }
  
    fetch() {
      return this.productcategoryService.list();
    }
  
    delete(id) {
       return this.productcategoryService.delete(id);
    }

  showAddRoleForm(isNew) {
    if (isNew) {
      this.selectedRow = null;
    }
    const ref = this.dialogService.open(CreateComponent, {
      styleClass: 'w-9 md:w-6',
      header: 'Product Category',
      dismissableMask: true,
      data: {
        selectedcategory: this.selectedRow
      },
    });
    ref.onClose.subscribe((isSubmitted) => {
      if (isSubmitted) {
        this.fetchList();
      }
    });
  }

  }
