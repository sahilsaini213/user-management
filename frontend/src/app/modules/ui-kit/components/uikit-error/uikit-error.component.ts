import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'uikit-error',
  templateUrl: './uikit-error.component.html',
  styleUrls: ['./uikit-error.component.scss']
})
export class UikitErrorComponent implements OnInit {
  @Input() controls;
  @Input() name: string
  @Input() submitted = false;
  @Input() placehoher: string;
  constructor() { }

  ngOnInit(): void {

  }

  validationCaseAdded(errors) {
    return !errors.minlength && !errors.maxlength; 
  }

}
