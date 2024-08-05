import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GResult } from 'src/app/types/result';
import { environment } from 'src/environments/environment';
import { MovingReport } from 'src/app/types/movingReports';
@Component({
  selector: 'app-moving-reports',
  templateUrl: './moving-reports.component.html',
  styleUrls: ['./moving-reports.component.css']
})
export class MovingReportsComponent implements OnInit {
  reports: MovingReport[] = new Array<MovingReport>();
  root: string = environment.rootUrl + 'Repots';
 
  
 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   
    this.getMovingReport();
   
  
  }


  getMovingReport() {
    this.http.get(this.root + '/GetMovingReports').subscribe((res: GResult<MovingReport[]>) => {
      this.reports = res.value;

    });
  }

}
