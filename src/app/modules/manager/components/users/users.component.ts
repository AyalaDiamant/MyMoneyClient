import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { userType } from 'src/app/types/enums';
import { IdName } from 'src/app/types/id-name';
import { LenderParams } from 'src/app/types/lender-params';
import { Lists } from 'src/app/types/lists';
import { GResult, Result } from 'src/app/types/result';
import {  User, UserSearch } from 'src/app/types/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  userToDelete: User = new User();
  propToSort: string = "";
  showAllUsers: boolean = false;
  root: string = environment.rootUrl;
  okRemove: boolean = false;
  changeLender: boolean = false;
  changeOption: number = 1;
  lenderParams: LenderParams = new LenderParams();
  lenders: IdName[] = new Array<IdName>();
  managers: IdName[] = new Array<IdName>();
  userTypes: IdName[] = new Array<IdName>();
  searchOptions: boolean = false;
  userSearch: UserSearch = new UserSearch();
 


  constructor(private http: HttpClient, private alert: AlertService, private route: Router) { }

  //  בעמוד זה יש שורות מוסלשות כי רחל אמרה שנטפל בקוד הזה בשבוע של ההרשאות לא למחוק פנינה

  ngOnInit(): void {
    this.getUsers();
    this.getAllLists();
  }

  getUsers() {
    this.http.post(this.root + 'Users/GetUsers', this.userSearch).subscribe((res: GResult<User[]>) => {
      this.users = res.value;
    });
  }

  getAllLists() {
    this.http.get(this.root + 'List/GetAllLists').subscribe((res: GResult<Lists>) => {
      this.lenders = res.value.lenders;
      this.managers = res.value.managers;
      this.userTypes = res.value.userTypes;

    });
  }

  addOrUpdateUser(id: number) {
    this.route.navigate(['account/register', id]);
  }

  deleteUser(user: User) {
    let typeRemove;
    let msg;
    // if (this.users.find(x => x.id == user.id).userType.id == 2) {
    if (this.users.find(x => x.id == user.id).userType.id == userType.lender) {
      typeRemove = this.alert.removeLender;
      msg = "מלווה";
    }
    else {
      typeRemove = this.alert.remove;
      msg = "משתמש";
    }
    typeRemove(msg).then((result) => {
      if (result.isConfirmed) {
        if (msg == "מלווה") {
          this.okRemove = true;
          this.userToDelete = user;
          // this.newLender=new User();

          // this.lenderToDelete.id = id;
        }
        else {
          this.finalDelete(user)
        }
      }
    });
  }

  okChangeLender() {
    if (this.changeOption == 1) {
      this.finalDelete(this.userToDelete);
    }
    else {
      if (this.changeOption == 2) {
        this.lenderParams.oldLender = this.userToDelete.id;
        // this.lenderParams.userType = 3;
        this.lenderParams.userType = userType.user;
        this.changeUserTypeOrLenderAndDelete(this.lenderParams);
      }
      else {
        if (this.changeOption == 3) {
          this.changeLender = true;
          this.lenderParams.oldLender = this.userToDelete.id;
          // this.lenderParams.newLender = this.newLender.id;
          // this.lenderParams.userType = 6;
          this.lenderParams.userType = userType.presenceUser;
          this.changeUserTypeOrLenderAndDelete(this.lenderParams);
        }
      }
    }
  }

  finalDelete(user: User) {
    this.http.delete(this.root + 'Users/DeleteUser/' + user.id).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("המשתמש הפך למצב לא פעיל!");
        this.getUsers();
      }
      else {
        this.alert.error("ארעה שגיאה במהלך המחיקה...");
      }
    })
    this.clear();
  }

  clear() {
    this.okRemove = false;
    this.userToDelete = new User();
  }

  changeUserTypeOrLenderAndDelete(lenderParams: LenderParams) {
    this.http.put(this.root + "Users/ChangeUserTypeOrLenderAndDelete", lenderParams).subscribe((res: Result) => {
      if (res.success) {

        this.alert.success("המשתמש נמחק , הפרטים עודכנו בהצלחה!!");
        this.route.navigate(['/manager/users']);
        this.getUsers();
      }
    });
    this.clear();
  }

  changeSearchOptions() {
    this.searchOptions = !this.searchOptions;
  }

  clearingChoices(type: number) {
    console.log(type);

    if (type == 0) {
      this.userSearch = new UserSearch();
      this.getUsers();
    }
    else if (type == 1) {
      this.userSearch.usersUnderLender = new IdName();
      this.userSearch.lendersUnderManager = new IdName();
    }
    else if (type == 2) {
      this.userSearch.usersType = new IdName();
      this.userSearch.lendersUnderManager = new IdName();
    }
    else if (type == 3) {
      this.userSearch.usersType = new IdName();
      this.userSearch.usersUnderLender = new IdName();
    }
  }
}
