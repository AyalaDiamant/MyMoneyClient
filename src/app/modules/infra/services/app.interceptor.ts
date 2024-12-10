import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError,  map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../account/services/auth.service';
import { User } from 'src/app/types/user';

@Injectable()
export class AppInterceptor implements HttpInterceptor {


  constructor(private alert: AlertService, private route: Router, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var request1 = req.clone({
      withCredentials: true
    });

    var finalRequest = request1;

    var token = this.authService.getTokenIfIsValid();
    if (token) {
      finalRequest = request1.clone({
        headers: request1.headers.set('Authorization', 'Bearer ' + token),
      });
    }
  
    return next.handle(finalRequest).pipe(
    
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          // this.alert.error('קרתה שגיאה כללית, אנא פנה למנהל');
        }
        else {
          console.log('this is server side error');
          if (error.status == 400 && error.error.title == "One or more validation errors occurred.") {
            console.log(error.error.errors);
            // this.alert.error('קרתה שגיאה מסוג ולידציית נתונים, אנא פנה למנהל');
          }
          else if (error.status == 401) {
            // this.alert.info('אין לך הרשאות לדף זה, הינך מועבר לדף הכניסה');
            this.route.navigate(['account/login']);
          }
          else {
            // this.alert.error('קרתה שגיאה כללית, אנא פנה למנהל');
          }
        }
        return throwError(error);
      }),
      map((event: HttpEvent<any>) => {
    

        if (event instanceof HttpResponse) {
          if (event.body && event.body.success == false) {
            if (event.body.message) {

              if (event.body.message == 'Error 8888') {
                // this.alert.warning('אין לך הרשאות לביצוע פעולה זו');
                this.route.navigate(['/account/login']);
              }
              else if (event.body.message == 'Error 6666') {
                this.alert.warning('פג תוקף פרטי הכניסה למערכת');
                this.authService.logout();
                this.route.navigate(['/account/login']);
              }
              else if (event.body.message == 'Error 7777') {
                let user: User = new User();
                user.isActive = false;
                this.authService.logout();
                sessionStorage.setItem("user", JSON.stringify(user));
                this.alert.error("משתמש לא פעיל");
                this.route.navigate(['/account/login']);
              } 
              else {
                this.alert.error(event.body.message);
              }
            }
            else {
              // this.alert.error('קרתה שגיאה כללית במערכת, אנא פנה למנהל');
            }
          }
        }

        return event;
      })
    );
  }
}
