import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { ManagerDesign } from 'src/app/types/manager-design';
import { GResult, Result } from 'src/app/types/result';
import { User } from 'src/app/types/user';
import { environment } from 'src/environments/environment';
import { DesignService } from 'src/app/modules/infra/services/design.service';
import { log } from 'console';
import { tr } from 'date-fns/locale';

@Component({
  selector: 'app-website-design',
  templateUrl: './website-design.component.html',
  styleUrls: ['./website-design.component.css']
})
export class WebsiteDesignComponent implements OnInit {
  root: string = environment.rootUrl + 'ManagerDesign/';
  currentDesign: ManagerDesign = new ManagerDesign();
  urlSave: string = 'UpdateManagerDesign';
  formData: FormData = new FormData();
  isFileFromUploud: boolean = false;
  thisUser: User;
  @ViewChild('inputFile') myInputVariable: ElementRef<any>;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private router: Router,
    private designService: DesignService
  ) { }

  ngOnInit(): void {
    // בשביל שהשדות יהיו מלאים בעיצוה בנוכחי
    this.getManagerDesign();
  }

  getManagerDesign() {
    // פנייה לשרת בכתובת המצוינת ושליפת העיצוב הנוכחי
    this.http.get(this.root + 'GetManagerDesign').subscribe((res: GResult<ManagerDesign>) => {
      this.currentDesign = res.value;
      this.currentDesign.src = environment.rootUrl + this.currentDesign.src;
      console.log('in get ', this.currentDesign);
      this.designService.updateDesign(this.currentDesign);
    });
  }

  finishSetFile(fileFromUploud: File) {
    // בשביל שנוכל אח"כ להשתמש בתמונה fileName,file את השדות  formData אם נבחר קובץ מוסיך ל 
    this.formData.append('file', fileFromUploud);
    this.formData.append('fileName', fileFromUploud.name);
    this.isFileFromUploud = true;
  }
  saveDesign() {
    //formData פונקציה לשמירת העיצוב - מוסיפה את כל השדות על ה
    if (!this.isFileFromUploud)
      this.formData.append('fileName', this.currentDesign.fileName);
    this.formData.append('imageContent', this.currentDesign.imageContent);
    this.formData.append('id', this.currentDesign.id.toString());
    this.formData.append('title', this.currentDesign.title);
    this.formData.append('slogan', this.currentDesign.slogan);
    this.formData.append('headerColor', this.currentDesign.headerColor);
    this.formData.append('textColor', this.currentDesign.textColor);

    this.http.put(this.root + this.urlSave, this.formData).subscribe(async (res: Result) => {
      if (res.success) {
        this.alert.success('עיצוב נשמר בהצלחה');
        this.getManagerDesign();
        this.designService.updateDesign(this.currentDesign);
      }
    });

  }
  cancelDesign() {
    // this.getManagerDesign(true);
    window.location.reload();
  }

}
