import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NgPrimeModule } from 'src/app/modules/ng-prime/ng-prime.module';

@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  standalone: true,
  imports: [
    DividerModule,
    NgPrimeModule
  ]
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
