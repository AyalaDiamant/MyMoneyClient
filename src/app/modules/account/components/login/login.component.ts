import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { LoginUser } from 'src/app/types/login';
import { AuthService } from '../../services/auth.service';
import { Console } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: LoginUser = new LoginUser();
  constructor(private alert: AlertService, private route: Router, private authService: AuthService ) { }

  ngOnInit(): void {
    if (this.authService.isNotActive()) {
      this.alert.error("משתמש לא פעיל");
    }
  }
  signIn() {
    this.authService.signIn(this.loginUser).then((res: boolean) => {
      if (res) {
        this.route.navigate(['/home/dashboard']);
      }
      else if (this.authService.isNotActive()) {
        window.location.reload();

      }
    });
  }
}
