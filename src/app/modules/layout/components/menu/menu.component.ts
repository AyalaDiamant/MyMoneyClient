import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { userType } from 'src/app/types/enums';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
//  בעמוד זה יש שורות מוסלשות כי רחל אמרה שנטפל בקוד הזה בשבוע של ההרשאות לא למחוק פנינה
  
export class MenuComponent implements OnInit {
  userType: number;
  constructor(private auth: AuthService, private route: Router) { }
  // public isManager = this.auth.getPermissionType() == 1;
  // public isManager = this.auth.getPermissionType() == userType.systemAdministrator;
  // public isManagerIrgun = this.auth.getPermissionType() == userType.lendersManager;
  public isPermission = this.auth.isPermission();
  public isLender = this.auth.isLender();
  public isManager = this.auth.isManager();

  isPremmosion: boolean = false;
  @Input() refreash;
  isAthenticate: boolean = this.auth.isAuthenticated();
  name: string;
  id: number;
  public isNotActive: boolean = this.auth.isNotActive();
  isSimpleUser: boolean = this.auth.isSimpleUser();
  ngOnInit(): void {
    console.log(this.isManager,'isManager');
    console.log(this.isPermission,'isPermission');

    if (this.auth.getUserName() != null) {
      console.log(this.auth,"auth");
      
      this.name = this.auth.getUserName();
    }
    if (this.auth.getUserId() != null) {
      this.id = this.auth.getUserId();
    }
    if(this.auth.getUserType()!=null)
      {
        this.userType=this.auth.getUserType();
      }
  }

}
