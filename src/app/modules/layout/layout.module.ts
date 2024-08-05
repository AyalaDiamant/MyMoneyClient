import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { DefaultComponent } from './components/default/default.component';
import { RouterModule } from '@angular/router';
import { InfraModule } from '../infra/infra.module';
import { BrowserModule } from '@angular/platform-browser';





@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent, DefaultComponent,],
  imports: [
    CommonModule,
    BrowserModule,
    InfraModule,
    RouterModule.forChild([])
  ]
})
export class LayoutModule { }
