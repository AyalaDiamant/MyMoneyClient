import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { userType } from 'src/app/types/enums';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
//  בעמוד זה יש שורות מוסלשות כי רחל אמרה שנטפל בקוד הזה בשבוע של ההרשאות לא למחוק פנינה
  
export class DefaultComponent implements OnInit {
  @HostBinding('style.overflow') overflow = 'hidden';

  constructor(private auth: AuthService) { }
  // public isManager = this.auth.getPermissionType()==1;
  public isManager = this.auth.getPermissionType()==userType.systemAdministrator;
  // public isLendersManager = this.auth.getPermissionType()==5;
  public isUserUnderLender = this.auth.getPermissionType()==userType.userUnderLender;
  // public isLender = this.auth.getPermissionType()==2;
  public isLender = this.auth.getPermissionType()==userType.lender;

  ngOnInit(): void {

  }
 


}
