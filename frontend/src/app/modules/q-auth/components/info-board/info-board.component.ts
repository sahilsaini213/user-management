import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.scss'],
  host: {
    class: 'banner-surface-d hidden md:flex md:col-5 border-round-left-3xl shadow'
  }
})
export class InfoBoardComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
