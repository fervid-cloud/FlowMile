import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.css']
})
export class CustomSpinnerComponent implements OnInit {
  dotIndicatorHelper: any;

  constructor() { }

  ngOnInit(): void {
  }

}
