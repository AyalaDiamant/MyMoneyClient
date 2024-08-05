import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { DebtSearchDetails } from 'src/app/types/debt';
import { IdName } from 'src/app/types/id-name';
import { Lists } from 'src/app/types/lists';
import { GResult } from 'src/app/types/result';
import { TableCode } from 'src/app/types/table-code';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  userTypeCode: TableCode = TableCode.userTypes;
  citiesCode: TableCode = TableCode.cities;
  urgencyDebtCode: TableCode = TableCode.urgencyDebt;
  areaCode: TableCode = TableCode.areas;
  statusCode:TableCode=TableCode.statuses;
  payOptionCode:TableCode = TableCode.payOption;
  lists: Lists = new Lists();
  root: string = environment.rootUrl + 'List';
  debtSearch: DebtSearchDetails= new DebtSearchDetails();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.root + '/GetAllLists').subscribe((res: GResult<Lists>) => {
      this.lists = res.value;
      
      

      
    });
    
  }

}
