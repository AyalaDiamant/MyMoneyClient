import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { GResult, Result } from 'src/app/types/result';
import { Presence, PresenceSearch } from 'src/app/types/presence';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {

  root: string = environment.rootUrl + 'Presence';
  @Input() presenceList: Presence[] = new Array<Presence>();
  newPresence: Presence = new Presence();
  search:PresenceSearch = new PresenceSearch();
showMsg:boolean=false;

  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {

    this.getPresences();
    
  }

  getPresences() {
    this.http.post(this.root + '/GetPresences', this.search).subscribe((res: GResult<Presence[]>) => {
      this.presenceList = res.value;
    });
  }

  cancelNew() {
    this.newPresence = new Presence();
  }


  addTimer() {
    this.http.post(this.root + '/AddPresence', this.newPresence).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("נוסף בהצלחה!");
      }
      else {
        this.alert.error("ה");
      }
      this.newPresence = new Presence();
      this.getPresences();
    })

  }
  editPresence(p: Presence) {
    p.inEdit = true;
  }

  deletePresence(id: number) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((result) => {
      if (result.isConfirmed == true) {
        this.http.delete(this.root + '/DeletePresence/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success(" נמחק בהצלחה");
          }
          else {
            this.alert.error("לא ניתן היה למחוק...");
          }
          this.getPresences();
        });
      }
    });
  }

  save(p: Presence) {
    p.inEdit = false;
    this.http.put(this.root + '/UpdatePresence', p).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("עודכן בהצלחה!");
      }
      else {
        this.alert.error("ארעה שגיאה במהלך העדכון");
      }
      this.getPresences();
    })
  }

  cancel(p: Presence) {
    p.inEdit = false;
    this.getPresences();
  }

  clear() {
    this.search = new PresenceSearch();
    this.getPresences();
  }
}
