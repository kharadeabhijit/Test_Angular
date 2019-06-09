import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mdl-test';

  private dataSource:Object = {
    "columnType":["String", "Number", "Date", "Boolean"],
    "editable":["Yes", "No"]
  }
}
