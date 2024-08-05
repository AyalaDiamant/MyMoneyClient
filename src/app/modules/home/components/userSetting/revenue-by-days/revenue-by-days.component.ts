import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DaysRevenuesExpanded } from 'src/app/types/expanded-revenues';
import { environment } from 'src/environments/environment';
import { GResult, Result } from 'src/app/types/result';
import { AlertService } from 'src/app/modules/infra/services/alert.service';

@Component({
  selector: 'app-revenue-by-days',
  templateUrl: './revenue-by-days.component.html',
  styleUrls: ['./revenue-by-days.component.css']
})

export class RevenueByDaysComponent implements OnInit {

  root: string = environment.rootUrl;
  add: boolean = false;
  newDaysRevenues: DaysRevenuesExpanded = new DaysRevenuesExpanded();
  list: DaysRevenuesExpanded[];

  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {
    this.getRevenues();
  }

  getRevenues() {
    this.http.get(this.root + 'ExpandedRevenuesSetting/GetDaysRevenuesExpanded').subscribe((res: GResult<DaysRevenuesExpanded[]>) => {
      this.list = res.value;
    });
  }

  changeAdd() {
    this.add = !this.add;
  }

  addRevenue() {
    this.http.post(this.root + 'ExpandedRevenuesSetting/AddPresenceRevenue', this.newDaysRevenues).subscribe((res: Result) => {
      this.getRevenues();
      this.add = !this.add;
      this.newDaysRevenues = new DaysRevenuesExpanded();
    });
  }

  editRevenue(i: DaysRevenuesExpanded) {
    this.list.forEach(item => {
      if (item.presenceId == i.presenceId) {
        item.inEdit = true;
      }
      else {
        item.inEdit = false;
      }
    });
  }

  save(revenue: DaysRevenuesExpanded) {
    console.log("in save");
    revenue.inEdit = false;
    this.http.put(this.root + 'ExpandedRevenuesSetting/UpdatePresenceRevenue', revenue).subscribe((res: Result) => {
      console.log("in the put");
      if (res.success) {
        this.alert.success("ההכנסה עודכנה בהצלחה!")
        revenue.inEdit = false;
      }
      else {
        this.alert.error("קיימת כזאת הכנסה במערכת...")
        revenue.inEdit = true
      }
      this.getRevenues();
    })
  }

  cancel(i: DaysRevenuesExpanded) {
    i.inEdit = false;
    this.getRevenues();
  }

  deleteRevenue(id: number) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((Result) => {
      if (Result.isConfirmed == true) {
        this.http.delete(this.root + 'ExpandedRevenuesSetting/DeletePresenceRevenue/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("ההכנסה נמחקה בהצלחה!");
          }
          this.getRevenues();
        });
      }
    });
  }

}
