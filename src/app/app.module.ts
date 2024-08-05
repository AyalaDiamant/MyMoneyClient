import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './modules/layout/components/default/default.component';
import { LoginComponent } from './modules/account/components/login/login.component';
import { ContactUsComponent } from './modules/home/components/contact-us/contact-us.component';
import { InfraModule } from './modules/infra/infra.module';
import { LayoutModule } from './modules/layout/layout.module';
import { IsManagerGuard } from './modules/infra/services/is-manager.guard';
import { AuthGuard } from './modules/account/services/auth.guard';
import { HomePageComponent } from './modules/home/components/home-page/home-page.component';




@NgModule({
  declarations: [
    AppComponent,

   
    
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    InfraModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: DefaultComponent, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
      // {path :'homepage',component:HomePageComponent},
      { path: 'account',component: DefaultComponent, loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
      { path: 'manager',component: DefaultComponent, loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)}, 
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ]),
    HttpClientModule,
    AppRoutingModule
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
