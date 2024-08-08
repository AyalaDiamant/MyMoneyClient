import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { environment } from 'src/environments/environment';
import { ManagerSetting } from 'src/app/types/manager-setting';
import { GResult, Result } from 'src/app/types/result';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { User } from 'src/app/types/user';
import { UsersComponent } from '../users/users.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manager-setting',
  templateUrl: './manager-setting.component.html',
  styleUrls: ['./manager-setting.component.css']
})
export class ManagerSettingComponent implements OnInit {
  // בעקרון אמור ללכת לקונטרולר חדש שיצרתי אבל משום מה עושה מלא בעיות
  // אז שלחתי לקונטרולר שהיה קיים צריך לשנות תא זה
  root: string = environment.rootUrl + 'ManagerDesign/';
  managerSetting: ManagerSetting = new ManagerSetting();
  managerSettingList: ManagerSetting[];
  title: string = "הארגונים תחתיך";
  findOrganization: ManagerSetting = new ManagerSetting()
  isShow: boolean = false;
  thisManager: User;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private auth: AuthService,
    private userService: UserService
  ) { }

  public isPermission = this.auth.isPermission();


  ngOnInit(): void {
    this.getManagerSetting();
    this.userService.fetchUsers();


  }

  getManagerSetting() {
    this.http.get<GResult<ManagerSetting[]>>(this.root + 'GetManagerSetting').subscribe(res => {
      if (res.success) {
        this.managerSettingList = res.value;
        // אם זה פרמטר אחד ממלא אותו בטופס
        if (this.managerSettingList.length == 1) {
          this.title = "הגדרות הארגון שלך"
          this.managerSettingList.forEach(element => {
            this.managerSetting.adress = element.adress;
            this.managerSetting.contactMen = element.contactMen;
            this.managerSetting.email = element.email;
            this.managerSetting.id = element.id;
            this.managerSetting.managerId = element.managerId;
            this.managerSetting.organizationName = element.organizationName;
            this.managerSetting.organizationType = element.organizationType;
            this.managerSetting.phon = element.phon;
          });
        }
      } else {
        this.alert.error('שגיאה בשליפת נתוני ההגדרות');
      }
    });
  }

  saveManagerSetting() {
    this.http.put(this.root + 'UpdateManagerSetting', this.managerSetting).subscribe((res: Result) => {
      console.log(res);
      if (res.success) {
        this.alert.success('ההגדרות נשמרו בהצלחה');
      } else {
        this.alert.error('שגיאה בשמירת ההגדרות');
      }
    });
  }

  cancel() {
    this.getManagerSetting();
  }

  showOrganizationDetails(id: number) {
    this.findOrganization = this.managerSettingList.find(item => item.id == id) || new ManagerSetting();
    this.isShow = !this.isShow;
    this.thisManager = this.userService.getManagerById(this.findOrganization.managerId);
    console.log( this.thisManager,' this.thisManager');
    
  }
}

