import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { Area } from 'src/app/types/area';
import { IdName } from 'src/app/types/id-name';
import { GResult, Result } from 'src/app/types/result';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  root: string = environment.rootUrl + 'Area';
  areas: Area[];
  areasGlobal: IdName[];
  @Input() type: number;
  title: string;
  newArea: Area = new Area();
  addMode: boolean = false;
  anouther: boolean = true;
  descriptionForSelect: IdName = new IdName();
  userId: number


  constructor(private http: HttpClient, private alert: AlertService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.userId = +params.get('userId');
    // });    
    this.getAreaList();
    this.getAreas();
    if (this.type == 1) {
      this.title = "תחומי הכנסות";
    }
    else {
      this.title = "תחומי הוצאות";
    }

  }

  getAreas() {
    this.http.get(this.root + '/GetAreas/' + this.type).subscribe((res: GResult<Area[]>) => {//(type) זמני - עד שנסדר בשרת - צריך לשלוח לשרת סוג 
      this.areas = res.value;
     console.log( this.areas,' this.areas')
    });
  }

  getAreaList() {
    this.http.get(this.root + '/GetAreaList/' + this.type).subscribe((res: GResult<IdName[]>) => {
      this.areasGlobal = res.value;
    });
  }


  addArea() {
    this.newArea.type = this.type;
    this.newArea.isActive = true;
    this.http.post(this.root + '/AddArea', this.newArea).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("תחום נוסף בהצלחה!")
        this.addMode = false;
      }
      else {
        if(res.value === 1412)
          this.alert.error(res.message)
        else
          this.alert.error("קיים כזה תחום במערכת...")      }
      this.getAreas();
   
   
    });
  }

  changeMode() {
    this.addMode = !this.addMode;
    this.newArea = new Area();
    this.descriptionForSelect = new IdName();
  }

  changeDomain(event: IdName) {
    if (event == null) {
      this.newArea.description = '';
    }
    else {
      this.newArea.description = event.name;
    }
  }

  save(sub: Area) {
    sub.type = this.type;
    sub.inEdit = false;
    this.http.put(this.root + '/UpdateArea', sub).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("תחום עודכן בהצלחה!")
        sub.inEdit = false;
      }
      else {
        if(res.value === 1412)
          this.alert.error(res.message)
        else
          this.alert.error("קיים כזה תחום במערכת...")
        sub.inEdit = true
      }
      this.getAreas();
    });
  }

  checkIfIsAnother(event, i: Area) {
    if (event == 0) {
      i.description = "";
    }
  }

  editArea(sub: Area) {
    this.areas.forEach(item => {
      if (item.id == sub.id) {
        item.inEdit = true;
      }
      else {
        item.inEdit = false;
      }
    });
  }

  deleteArea(id: number) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((result) => {
      if (result.isConfirmed == true) {
        this.http.delete(this.root + '/DeleteArea/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("תחום נמחק בהצלחה!");
          }
          else {
            if(res.value === 1412)
              this.alert.error(res.message)
            else
              this.alert.info("התחום מקושר לתנועה ולכן התנועה הפכה למצב לא פעיל");
          }
          this.getAreas();
        });
      }
    });
  }

  cancel(item: Area) {
    item.inEdit = false;
    this.getAreas();
  }

}
