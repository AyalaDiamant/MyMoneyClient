import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { InfraModule } from '../infra/infra.module';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { FirstLoadingComponent } from './components/first-loading/first-loading.component';

@NgModule({
  declarations: [LoginComponent, ForgotPassComponent, IndexComponent, RegisterComponent, TermsComponent,FirstLoadingComponent],


  imports: [
    CommonModule,
    InfraModule,
    RouterModule.forChild([
      { path: '', component: IndexComponent ,children:[
        { path: 'register', component: RegisterComponent },
        { path: 'register/:id', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
        { path: 'forgot', component: ForgotPassComponent },
        { path: 'first', component: FirstLoadingComponent },
      ]},
     
     

    ])
  ]
})
export class AccountModule { }
