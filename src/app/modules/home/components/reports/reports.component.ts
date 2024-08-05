import { Component, OnInit } from '@angular/core';
import { repeat } from 'rxjs';
import { IdName } from 'src/app/types/id-name';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
    // payOptions: IdDescription[] = new Array<IdDescription>();
  }

}
