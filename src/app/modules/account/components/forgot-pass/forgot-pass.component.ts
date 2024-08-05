import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { Contact } from 'src/app/types/contact';
import { Result } from 'src/app/types/result';
import { User } from 'src/app/types/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private http: HttpClient, private alert: AlertService, private route:Router) { }

  userEmail: Contact = new Contact();
  root: string = environment.rootUrl + 'Account';

  ngOnInit(): void {
  }
  
  sendEmail(){
    this.http.post(this.root + '/ForgotPswd',this.userEmail).subscribe((res:Result)=>{
      if(res.success){
        this.alert.success("נשלח אליך מייל לשיחזור הסיסמה");
        this.route.navigate(['/account/login']);
      }
      else{
        this.alert.error("כתובת מייל לא נכונה");
      }
    });
  }

}
