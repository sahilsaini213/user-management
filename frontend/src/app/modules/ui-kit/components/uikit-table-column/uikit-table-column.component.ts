import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface IUikitColumn {
  key: string,
  type: string,
  label: string,
  style?: string,
  hasCenter: boolean,
  hasSorting: boolean,
  hasFilter: boolean,
  showMatchModes: boolean,
  showOperator: boolean,
  options?: {label: string, id: string}[]
}

@Component({
  selector: 'uikit-table-column',
  templateUrl: './uikit-table-column.component.html',
  styleUrls: ['./uikit-table-column.component.scss']
})
export class UikitTableColumnComponent implements OnInit, OnChanges {
  _defaultConfig: IUikitColumn = {
    key: 'name',
    type: 'text',
    label: 'Name',
    hasCenter: false,
    hasSorting: true,
    hasFilter: true,
    showMatchModes: true,
    showOperator: false
  }
  @Input() column: IUikitColumn;
  constructor() { }

  ngOnInit(): void {
    this.column = {
      ...this._defaultConfig,
      ...this.column
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
