import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  root: string = environment.rootUrl + 'Area';
  expandedRevenue: boolean = false;
  daysHours: boolean = false;
  productForDay: boolean = false;

  ngOnInit(): void {

  }

}
