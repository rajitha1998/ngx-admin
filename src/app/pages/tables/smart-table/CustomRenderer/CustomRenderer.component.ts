import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <button (click)="navigateToSomeRoute()">View Logs</button>
  `,
})
export class CustomRendererComponent implements ViewCell {

  constructor(private router: Router) { }
  renderValue: string;
  @Input() value: string; // This will be the value passed from the pathID column (see next code block)
  @Input() rowData: any;
  ngOnInit() {
  }

  navigateToSomeRoute() {
    this.router.navigate(['/some/path', this.value]); // so will go to /some/path/{{ value }}
  }

}
