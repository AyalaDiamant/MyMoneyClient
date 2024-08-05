import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { Contact } from 'src/app/types/contact';
import { Result } from 'src/app/types/result';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router, private alert: AlertService) { }

  root: string = environment.rootUrl + 'Contact';
  contact: Contact;

  color: string = "blue";

  ngOnInit(): void {
    this.contact = new Contact();
  }

  send() {
    this.http.post(this.root + '/SendRequest', this.contact).subscribe((data: Result) => {
      if (data.success) {
        this.alert.success("הפניה נשלחה בהצלחה");
        this.contact = new Contact();
      }
      else {
        this.alert.error("ארעה שגיאה במהלך שליחת פניה...");
      }
      this.route.navigate(['home']);
    })
  }
  myAlert(msg: string) {
    this.alert.success(msg);
  }
}
