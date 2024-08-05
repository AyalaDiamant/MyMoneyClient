import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IdName, IdNameDB } from 'src/app/types/id-name';
import { GResult, Result } from 'src/app/types/result';
import { environment } from 'src/environments/environment';
import { AlertService } from '../../services/alert.service';
import { TableCode } from 'src/app/types/table-code';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() list: IdName[] = new Array<IdNameDB>();
  @Input() tableCode: TableCode;
  @Input() type: number;
  @Input() allowUpdate: boolean;
  root: string = environment.rootUrl + 'List';
  addMode: boolean = false;
  isEdit: boolean = false;
  newItem: IdNameDB = new IdNameDB();


  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {
    this.refreshCurrentList();
  }

  getlist() {
    this.newItem.tableCode = this.tableCode;
    this.newItem.type = this.type;
    this.http.post(this.root + '/GetAllLists', this.newItem).subscribe((res: GResult<IdName[]>) => {
      this.list = res.value
      console.log(this.list, "list");
    }

    );
  }

  refreshCurrentList() {
    this.newItem.tableCode = this.tableCode;
    this.newItem.type = this.type;
    this.http.post(this.root + '/GetList', this.newItem).subscribe((res: GResult<IdName[]>) => this.list = res.value);
    console.log(this.list, "list");

  }

  changeMode() {
    this.addMode = !this.addMode;
    this.newItem = new IdNameDB();
  }

  addItem() {
    this.newItem.tableCode = this.tableCode;
    this.newItem.type = this.type;
    this.newItem.isActive = true;
    this.http.post(this.root + '/AddItem', this.newItem).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success('נוסף בהצלחה לרשימת ' + this.title);
        this.refreshCurrentList();
        this.newItem = new IdNameDB();
        this.addMode = false;
      }
      else {
        this.alert.error('קיים כבר במערכת');
      }
    });
  }

  editItem(item: IdName) {
    item.inEdit = true;
  }

  save(item: IdNameDB) {
    item.tableCode = this.tableCode;
    this.http.put(this.root + '/UpdateItem', item).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success('עודכן בהצלחה');
        this.refreshCurrentList();
      } else {
        this.alert.error('');
      }
    });
  }

  cancel(item: IdName) {
    item.inEdit = false;
    this.refreshCurrentList();
  }

  deleteItem(item: IdNameDB) {
    item.tableCode = this.tableCode;
    console.log(item.type, 'type');
    console.log(item.tableCode, 'tableCode');
    this.alert.remove("האם אתה בטוח רוצה למחוק את התנועה?").then((result) => {
      if (result.isConfirmed == true) {
        this.http.post(this.root + '/DeleteItem', item).subscribe((res: Result) => {
          console.log(res.success, "תגובה מהשרת")
          if (res.success) {
            this.alert.success(" נמחק בהצלחה!");
            this.refreshCurrentList();
          }
          else {
            this.alert.error("ארעה שגיאה במהלך המחיקה ...");
          }
        });
      }
    });
  }
}
// deleteItem(item: IdNameDB) {
//   item.tableCode = this.tableCode;
//   this.alert.remove("האם אתה בטוח רוצה למחוק את התנועה?").then((result) => {
//     if (result.isConfirmed == true) {
//       this.http.delete(this.root + '/DeleteItem/' +  { body: item }).subscribe((res: Result) => {
//         if (res.success) {
//           this.alert.success(" נמחק בהצלחה!");
//           this.refreshCurrentList();
//         }
//         else {
//           this.alert.error("ארעה שגיאה במהלך המחיקה ...");
//         }
//       });
//     }
//   });
// }
// }