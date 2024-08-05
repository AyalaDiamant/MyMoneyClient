import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { userType } from 'src/app/types/enums';

@Injectable({
  providedIn: 'root'
})
//  בעמוד זה יש שורות מוסלשות כי רחל אמרה שנטפל בקוד הזה בשבוע של ההרשאות לא למחוק פנינה
  
export class IsPermissionGuard implements CanActivate {
  constructor(private route:Router, private authService:AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(this.authService.getPermissionType()==1||this.authService.getPermissionType()==5||this.authService.getPermissionType()==2){
        if(this.authService.getPermissionType()==userType.systemAdministrator||this.authService.getPermissionType()==userType.userUnderLender||this.authService.getPermissionType()==userType.lender||this.authService.getPermissionType()==userType.lendersManager){
        return true;
      }
     
      else{
        this.route.navigate(['account/login']);
        return false;
      }
   
  }
}