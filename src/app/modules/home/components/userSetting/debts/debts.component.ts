
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { Area } from 'src/app/types/area';
import { Debt, DebtSearchDetails } from 'src/app/types/debt';
import { IdName } from 'src/app/types/id-name';
import { Moving } from 'src/app/types/moving';
import { GResult, Result } from 'src/app/types/result';
import { User } from 'src/app/types/user';
import { User2Area } from 'src/app/types/User2Area';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})
export class DebtsComponent implements OnInit {
  urgencyies: IdName[] = new Array<IdName>();
  expenses: Area[] = new Array<Area>();
  debts: Debt[] = new Array<Debt>();
  root: string = environment.rootUrl + 'Debts';
  rootTry: string = environment.rootUrl + 'Area'
  addMode: boolean = false;
  propToSort: any = '';
  newDebt: Debt = new Debt();
  areas: Area[];
  
  
  debtSearch: DebtSearchDetails= new DebtSearchDetails();
  // expensesList: IdName[]= new Array<IdName>();
  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {
    this.getExpensesList();
    this.getDebts();
    this.getUrgencyies();


  }
//שליפת הוצאות גלובליות
  // getExpensesList() {
  //   this.http.get(this.rootTry + '/GetAreaList/' + 2).subscribe((res: GResult<IdName[]>) => {
  //     this.expensesList = res.value;
  //     console.log('getExpensesList',this.expensesList)
  //   });
  // }
  getExpensesList() {
    //שליפת הוצאות אישיות
  this.http.get(this.rootTry + '/GetAreas/' + 2).subscribe((res: GResult<Area[]>) => {
    this.areas = res.value;
  
  });
}



  getDebts() {
    this.http.post(this.root + '/GetDebts',this.debtSearch).subscribe((res: GResult<Debt[]>) => {
      this.debts = res.value;
      console.log(this.debts, 'חובות')
    });
  }


  changeMode() {
    this.addMode = !this.addMode;
    this.newDebt = new Debt();
  }

  getUrgencyies() {
    this.http.get(this.root + '/GetUrgencyies').subscribe((res: GResult<IdName[]>) => {
      this.urgencyies = res.value;
    })
  }



  addDebt() {
    console.log('Sending Debt Data:', this.newDebt);
    this.http.post(this.root + '/AddDebt', this.newDebt).subscribe((res: Result) => {
      this.alert.success("החוב נוסף בהצלחה!")
      console.log('חוב חדש',this.newDebt)
     
      this.newDebt = new Debt();
      this.addMode = false;
      this.getDebts();
    console.log(this.debts,'רשימת חובות לאחר הוספה')
    
    });
  }

  deleteDebt(id: number) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((Result) => {
      if (Result.isConfirmed == true) {
        this.http.delete(this.root + '/DeleteDebt/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("החוב נמחק בהצלחה!");
          }
          else {
            this.alert.info("לא קיים חוב כזה, כנראה כבר נמחק")
          }
          this.getDebts();
        });
      }
    });
  }

  editDebt(debt: Debt) {
    debt.inEdit = true;
  }

  save(debt: Debt) {
    debt.inEdit = false;
    this.http.put(this.root + '/UpdateDebt', debt).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("החוב עודכן בהצלחה!")
      }
      else {
        this.alert.error("העדכון נכשל!")
      }
      this.getDebts();
    });
  }

  cancel(debt: Debt) {
    debt.inEdit = false;
    this.getDebts();
  }

}

