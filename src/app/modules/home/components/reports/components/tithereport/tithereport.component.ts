import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/types/area';
import { Moving } from 'src/app/types/moving';
import { GResult } from 'src/app/types/result';
import { Search } from 'src/app/types/search';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tithe, searchTithe, tithesData } from 'src/app/types/tithe';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
@Component({
  selector: 'app-tithereport',
  templateUrl: './tithereport.component.html',
  styleUrls: ['./tithereport.component.css']
})
export class TithereportComponent implements OnInit {
  search: searchTithe = new searchTithe()
  tithesData: tithesData = new tithesData();
  tithes: Tithe[] = new Array<Tithe>();
  year: string;
  root: string = environment.rootUrl;
  yearsMooving: number[] = new Array<number>();
  skipMonth: boolean = false;

  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {
    // default date
    this.search.fromDate = new Date(new Date().getFullYear(), 0, 2, 0, 0, 0);
    this.search.toDate = new Date();
    this.sumOfTithe();
    this.getYears()
  }
  sumOfTithe() {
    this.http.post(this.root + 'Repots/GetSumOfTithe', this.search).subscribe((res: GResult<tithesData>) => {
      this.tithesData = res.value;
    });

  }
  getYears() {
    this.http.get(this.root + 'Repots/GetYears').subscribe((res: GResult<Array<number>>) => {
      this.yearsMooving = res.value;
    });

  }
  validateDate() {
    let message = "", valid = true;

    if (this.search.fromDate > this.search.toDate) {
      message = "תאריך התחלה גדול מתאריך סיום";
      valid = false;
    }
    if (this.search.fromDate == null || this.search.toDate == null) {
      message = 'מלא את שדות טווח תאריכי חיפוש';
      valid = false;
    }
    if (new Date(this.search.fromDate) > new Date() || new Date(this.search.toDate) > new Date()) {
      message = 'טווח תאריך גדול מהיום';
      valid = false;
    }
    if (valid)
      this.sumOfTithe();
    else
      this.alert.info(message);
  }
  allDate() {
    this.search.allDate = true;
    this.sumOfTithe();
  }
  getByYear(event) {
    this.search.allDate = false;
    this.search.fromDate = new Date(event, 0, 1);
    this.search.toDate = new Date(event, 11, 31);
    this.sumOfTithe();
  }

}
