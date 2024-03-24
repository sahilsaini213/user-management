import { Component, Input, OnInit } from '@angular/core';

export enum QSkeletonType {
  TABLE = 'TABLE',
  CARD = 'CARD'
}

@Component({
  selector: 'q-skeleton',
  templateUrl: './q-skeleton.component.html',
  styleUrls: ['./q-skeleton.component.scss']
})
export class QSkeletonComponent implements OnInit {
  types = QSkeletonType;
  @Input() type: QSkeletonType = QSkeletonType.CARD;
  constructor() { }

  ngOnInit(): void {
  }

}
