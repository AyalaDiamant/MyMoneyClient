import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { environment } from 'src/environments/environment';
import { ManagerSetting } from 'src/app/types/manager-setting';
import { GResult, Result } from 'src/app/types/result';

@Component({
  selector: 'app-manager-setting',
  templateUrl: './manager-setting.component.html',
  styleUrls: ['./manager-setting.component.css']
})
export class ManagerSettingsComponent implements OnInit {
  root: string = environment.rootUrl + 'ManagerSetting/';
  managerSetting: ManagerSetting = new ManagerSetting();

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    // this.getManagerSetting();
  }

  // getManagerSetting() {
  //   this.http.get<GResult<ManagerSetting>>(this.root + 'GetManagerSetting').subscribe(res => {
  //     if (res.success) {
  //       this.managerSetting = res.value;
  //     } else {
  //       this.alert.error('שגיאה בשליפת נתוני ההגדרות');
  //     }
  //   });
  // }

  saveManagerSetting() {
    this.http.put<Result>(this.root + 'UpdateManagerSetting', this.managerSetting).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.alert.success('ההגדרות נשמרו בהצלחה');
      } else {
        this.alert.error('שגיאה בשמירת ההגדרות');
      }
    });
  }

  cancel() {
    // this.getManagerSetting();
  }
}

