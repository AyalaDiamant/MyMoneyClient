import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { App } from 'src/app/modules/infra/services/file.service';
import { moovingType } from 'src/app/types/enums';
import { Filters } from 'src/app/types/filters';
import { Moving } from 'src/app/types/moving';
import { GResult, Result } from 'src/app/types/result';
import { Search } from 'src/app/types/search';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movings',
  templateUrl: './movings.component.html',
  styleUrls: ['./movings.component.css']
})
export class MovingsComponent implements OnInit {
  // המשתנה type היה פה כ input מחקתי כי היה זכור לי שהיא אמרה למחוק ולא ראיתי בזה שימוש.
  // אם מישהי צריכה את זה זה השורה שההיתה פה קודם
  // @Input() type: number;

  typeAdd: number;
  showWarning: boolean = false;
  filters: Filters = new Filters();
  movings: Moving[] = new Array<Moving>();
  newMove: Moving = new Moving();
  root: string = environment.rootUrl;
  search: Search = new Search();
  title: string = "הכנסות והוצאות";
  moovExists: Moving;
  params: string;
  isSearch: boolean = false;


  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {
    this.http.get(this.root + 'Movings/GetFilters').subscribe((res: GResult<Filters>) => {
      this.filters = res.value;
      if (this.filters.payOptions == null || this.filters.areas == null || this.filters.payOptions.length == 0 || this.filters.areas.length == 0)
        this.showWarning = true;

    });
    // this.search.type = this.type;
    this.newMove.userArea.id = 0;
    this.typeAdd = 1;
    this.search.type = 0;
    var date = new Date();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let lastDay = new Date(year, month + 1, 0).getDate();

    this.search.from = new Date(year, month, 1, 0, 0, 0);
    this.search.to = new Date(year, month, lastDay, 0, 0, 0);
    console.log("from,", this.search.from);
    console.log("to,", this.search.to);
    this.getMovings();
    this.isSearch = false;
  }

  getMovings() {
    // this.search.type = this.type;
    this.http.post(this.root + "Movings/GetMovings", this.search).subscribe((res: GResult<Moving[]>) => {
      this.movings = res.value;
    });
  }

  onSearchClick() {
    this.isSearch = true;
    this.getMovings();
  }

  editMove(m: Moving) {
    m.inEdit = true;
  }

  chooseArea(event: Moving) {
    this.newMove.userArea.id = 0;
  }

  save(m: Moving) {
    this.moovExists = this.movings.find(moov => moov.id === m.id)
    if (!(this.eualsMooving(m, this.moovExists))) {
      this.http.put(this.root + 'Movings/UpdateMove', m).subscribe((res: Result) => {
        if (!res.success) {
          this.alert.confirm("קיימת תנועה באותו תאריך עם אותו סכום האם להוסיף שוב?").then((result) => {
            if (result.isConfirmed == true) {
              m.duplicate = true;
              return this.save(m);
            }
          });
        }
        else {
          this.alert.success("התנועה עודכנה בצלחה!");
          this.getMovings();
        }
      });
    }
    else {
      this.alert.success("התנועה עודכנה בצלחה!");
      // this.getMovings();
    }
    m.inEdit = false;
  }
  // עשיתי את זה בצורה רגילה ולא בתכונות מתקדמות של אנגולר כי עוד לא למדנו לא ראינו את ההסרטות
  eualsMooving(m1: Moving, m2: Moving) {
    let isMoovExists = true;
    if (m1.common !== m2.common)
      isMoovExists = false;
    else if (m2.date !== m1.date)
      isMoovExists = false;
    else if (m1.duplicate !== m2.duplicate)
      isMoovExists = false;
    else if (m1.inEdit !== m2.inEdit)
      isMoovExists = false;
    else if (m1.index !== m2.index)
      isMoovExists = false;
    else if (m1.isDeviation !== m2.isDeviation)
      isMoovExists = false;
    else if (m1.payOption !== m2.payOption)
      isMoovExists = false;
    else if (m1.sum !== m2.sum)
      isMoovExists = false;
    else if (m1.userArea !== m2.userArea)
      isMoovExists = false;
    return isMoovExists;
  }

  cancel(item: Moving) {
    item.inEdit = false;
    this.getMovings();
  }

  isError(move: Moving) {
    if (move.date == null) {
      return true;
    }
    if (move.userArea.id == 0) {
      return true;
    }
    if (move.payOption == null) {
      return true;
    }
    if (move.sum == null) {
      return true;
    }
    return false;
  }

  addMove() {
    this.http.post(this.root + 'Movings/AddMove', this.newMove).subscribe((res: Result) => {
      if (!res.success) {
        this.alert.confirm("קיימת תנועה באותו תאריך עם אותו סכום האם להוסיף שוב?").then((result) => {
          if (result.isConfirmed == true) {
            this.newMove.duplicate = true;
            return this.addMove();
          }
          else {
            this.newMove = new Moving();
            this.getMovings();
          }
        });
      }
      else {
        this.alert.success("התנועה נוספה בצלחה!");
        this.typeAdd = 1;
        this.newMove = new Moving();
        this.getMovings();
      }
    });
  }

  deleteMove(id: number) {
    this.alert.remove("האם אתה בטוח רוצה למחוק את התנועה?").then((result) => {
      if (result.isConfirmed == true) {
        this.http.delete(this.root + 'Movings/DeleteMove/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("התנועה נמחקה בהצלחה!");
          }
          else {
            this.alert.error("ארעה שגיאה במהלך מחיקת התנועה...");
          }
          this.getMovings();
        });
      }
    });
  }
  clear() {
    this.search = new Search();
    this.search.type = 0;
    this.typeAdd = 1;
    var date = new Date();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let lastDay = new Date(year, month + 1, 0).getDate();
    this.search.from = new Date(year, month, 1, 16, 0, 0);
    this.search.to = new Date(year, month, lastDay, 16, 0, 0);
    this.getMovings();
  }
  printToPDF() {
    App.downloadFile(
      this.http,
      this.root + "PDF/DownloadMovingsPDF",
      this.search,
      App.FileType.pdf
    );
  }
}
