import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseList } from 'src/app/classes/base-list';
import { IUikitColumn } from 'src/app/modules/ui-kit/components/uikit-table-column/uikit-table-column.component';
import { IProduct, ProductsService } from '../products.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseList<IProduct> implements OnInit {

  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  tableColumnsCount: number = 13;
  permissions: any = {};
  columns: Partial<IUikitColumn>[] = [
    {key: 'id', label: 'Id', style: 'min-width:8rem;', type: 'numeric' },
    {key: 'name', label: 'Name', style: 'min-width:15rem;'},
    {key: 'code', label: 'Code', style: 'min-width:9rem;'},
    {key: 'origin_country', label: 'Origin Country', style: 'min-width:14rem;'},
    {key: 'category', label: 'Category', style: 'min-width:12rem;'},
    {key: 'sub_category', label: 'Sub-Category', style: 'min-width:13rem;'},
    {key: 'brand', label: 'Brand', style: 'min-width:10rem;'},
    {key: 'unit', label: 'Unit', style: 'min-width:9rem;'},
    {key: 'variant', label: 'Variant', style: 'min-width:10rem;'},
    {key: 'stock', label: 'Stock', style: 'min-width:9rem;'},
    {key: 'price_per_unit', label: 'Price', style: 'min-width:9rem;'},
    {key: 'action', label: 'Action', hasCenter: true, hasSorting: false, hasFilter: false }
  ];

    constructor(
    private productsService: ProductsService,
    private cdref: ChangeDetectorRef,
    public dialogService: DialogService,
    public activatedRoute: ActivatedRoute
  ) { 
    super();
  }

  ngOnInit() {
    this.onInIt();
  }

  fetch() {
    return this.productsService.list()
  }

  delete(id) {
    return this.productsService.delete(id);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
