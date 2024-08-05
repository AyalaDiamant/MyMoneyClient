import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { ManagerDesign } from 'src/app/types/manager-design';
import { environment } from 'src/environments/environment';
import { DesignService } from 'src/app/modules/infra/services/design.service'; // הוסף את השירות
import { GResult } from 'src/app/types/result';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isAthenticate: boolean = this.auth.isAuthenticated();
  name: string;
  id: number;
  public isNotActive: boolean = this.auth.isNotActive();
  isSimpleUser: boolean = this.auth.isSimpleUser();
  currentDesign: ManagerDesign = new ManagerDesign();
  @Input() refreash;

  constructor(
    private auth: AuthService,
    private route: Router,
    private http: HttpClient,
    private designService: DesignService
  ) { }

  ngOnInit(): void {
    if (this.auth.getUserName() != null) {
      this.name = this.auth.getUserName();
    }
    if (this.auth.getUserId() != null) {
      this.id = Number(this.auth.getUserId());
    }

    this.designService.currentDesign$.subscribe((design) => {
      this.currentDesign = design;
    });

    if (this.auth.getUserId() != null) {
      this.getManagerDesign();
    }
  }

  getManagerDesign() {
    console.log(this.name, 'name');
    
    this.http.get(environment.rootUrl + 'ManagerDesign/GetManagerDesign').subscribe((res: GResult<ManagerDesign>) => {
      this.currentDesign = res.value;
      this.designService.updateDesign(this.currentDesign); 
    });
  }

  logOut() {
    this.auth.logout();
    this.isNotActive = false;
    this.route.navigate(['/account/login']);
    this.isAthenticate = false;
  }
}

