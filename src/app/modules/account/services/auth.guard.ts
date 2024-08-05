import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validate(route);
  }

  private validate(route?: ActivatedRouteSnapshot) {
     if (!this.authService.isAuthenticated()) {
      this.router.navigate(['account/first']);
      return false;
    }
    if(this.authService.isNotActive()){
      this.router.navigate(['account/first']);
      return false;
    }
    return true;
  }
  
}
