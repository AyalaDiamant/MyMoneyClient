import { Component, OnInit } from '@angular/core';
import { GResult } from 'src/app/types/result';
import { environment } from 'src/environments/environment';
import { Debt, DebtSearchDetails } from 'src/app/types/debt';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-debtreport',
  templateUrl: './debtreport.component.html',
  styleUrls: ['./debtreport.component.css']
})
export class DebtreportComponent implements OnInit {


  root: string = environment.rootUrl + 'Repots';
  root1: string = environment.rootUrl + 'Debts';
  debts: Debt[] = new Array<Debt>();
  debtSearch: DebtSearchDetails= new DebtSearchDetails();




  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDebts();

  }

  getDebts() {
    this.http.post(this.root1 + '/GetDebts',this.debtSearch).subscribe((res: GResult<Debt[]>) => {
      this.debts = res.value;
      console.log(this.debts, 'חובות')
    });
  }
}
