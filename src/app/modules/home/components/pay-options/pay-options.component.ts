import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { GResult, Result } from 'src/app/types/result';
import { environment } from 'src/environments/environment';
import { IdName } from 'src/app/types/id-name';
@Component({
  selector: 'app-pay-options',
  templateUrl: './pay-options.component.html',
  styleUrls: ['./pay-options.component.css']
})
export class PayOptionsComponent implements OnInit {

  payOptions: IdName[] = new Array<IdName>();
  root: string = environment.rootUrl + 'PayOption';

  newPayOpt: IdName = new IdName();
  addMode: boolean = false;
  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {
    this.getPayOptions();
  }

  getPayOptions() {
    this.http.get(this.root + '/GetPayOptions').subscribe((res: GResult<IdName[]>) => 
      this.payOptions = res.value
    );
  }
  changeMode() {
    this.addMode = !this.addMode;
    this.newPayOpt = new IdName();

  }
  addPayOpt() {
    this.http.post(this.root+ '/AddPayOptions', this.newPayOpt).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("אופן התשלום נוסף בהצלחה!");
      }
      else {
        this.alert.error("קיים כזה אופן תשלום במערכת");
      }
      this.newPayOpt = new IdName();
      this.addMode = false;
      this.getPayOptions();
    });
  }
  
  editPayOpt(payOpt : IdName) {
    this.payOptions.forEach(item => {
      if (item.id == payOpt.id) {
        item.inEdit = true;
      }
      else {
        item.inEdit = false;
      }
    });
  }

  deletePayOpt(id: number) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((result)=>{
      if(result.isConfirmed == true)
      {
        this.http.delete(this.root + '/DeletePayOption/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("אופן התשלום נמחק בהצלחה");
          }
          else {
            this.alert.error("לא ניתן היה למחוק את האופן תשלום, כיוון שהוא מקושר לתנועה כלשהי...");
          }
          this.getPayOptions();
        });
      }
    });
  }

  save(i: IdName) {
    i.inEdit = false;
    this.http.put(this.root + '/UpdatePayOption', i).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("אופן התשלום עודכן בהצלחה!");
      }
      else {
        this.alert.error("קיים כזה אופן תשלום במערכת...");
      }
      this.getPayOptions();

    });
  }

  cancel(item: IdName) {
    item.inEdit = false;
    this.getPayOptions();
  }

}
