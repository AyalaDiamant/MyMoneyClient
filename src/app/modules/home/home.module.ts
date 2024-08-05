import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BoolConvertPipe } from './pipes/bool-convert.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { InfraModule } from '../infra/infra.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from '../account/services/auth.guard';
import { MovingsComponent } from './components/movings/movings.component';
import { SumPipe } from './pipes/sum.pipe';
import { SearchIsActivePipe } from './pipes/search-is-active.pipe';
import { PayOptionsComponent } from './components/pay-options/pay-options.component';
import { HelpComponent } from './components/help/help.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TimeClockComponent } from './components/time-clock/time-clock.component';
import { TimeCalculationPipe } from './pipes/time-calculation.pipe';
import { ReportsComponent } from './components/reports/reports.component';
import { IncomeReportComponent } from './components/reports/components/income-report/income-report.component';
import { ExpensReportComponent } from './components/reports/components/expens-report/expens-report.component';
import { TithereportComponent } from './components/reports/components/tithereport/tithereport.component';
import { HistoryreportComponent } from './components/reports/components/historyreport/historyreport.component';
import { DebtreportComponent } from './components/reports/components/debtreport/debtreport.component';
import { BalanceCalculationPipe } from './pipes/balance-calculation.pipe';
import { TotalPipe } from './pipes/total.pipe';
import { SortArrIsActivePipe } from './pipes/sort-arr-is-exist.pipe';
import { TotalTimeCalculationPipe } from './pipes/total-time-calculation.pipe';
import { ConvertMsToTimePipe } from './pipes/convert-ms-to-time.pipe';
import { DocumentComponent } from './components/document/document.component';
import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { MovingReportsComponent } from './components/reports/components/moving-reports/moving-reports.component';
import { AmountalCulationPipe } from './pipes/amountal-culation.pipe';
import { SortPropPipe } from './pipes/sort-prop.pipe';
import { SumOfTithePipe } from './pipes/sum-of-tithe.pipe';
import { TotalTitheListPipe } from './pipes/total-tithe-list.pipe';
import { AreaComponent } from './components/userSetting/area/area.component';
import { DebtsComponent } from './components/userSetting/debts/debts.component';
import { SettingsComponent } from './components/userSetting/settings/settings.component';
import { RevenueByDaysComponent } from './components/userSetting/revenue-by-days/revenue-by-days.component';
import { RevenueByProductComponent } from './components/userSetting/revenue-by-product/revenue-by-product.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ContactUsComponent,
    AboutUsComponent,
    BoolConvertPipe,
    SearchPipe,
    HomePageComponent,
    MovingsComponent,
    SumPipe,
    SearchIsActivePipe,
    SettingsComponent,
    PayOptionsComponent,
    HelpComponent,
    PaymentComponent,
    ReportsComponent,
    IncomeReportComponent,
    ExpensReportComponent,
    TithereportComponent,
    HistoryreportComponent,
    DebtreportComponent,
    BalanceCalculationPipe,
    TotalPipe,
    SortArrIsActivePipe,
    TimeClockComponent,
    TimeCalculationPipe,
    DebtsComponent,
    PaymentComponent,
    SortArrIsActivePipe,
    DocumentComponent,
    TotalTimeCalculationPipe,
    ConvertMsToTimePipe,
    TasksComponent,
    AreaComponent,
    MovingReportsComponent,
    AmountalCulationPipe,
    SortPropPipe,
    SumOfTithePipe,
    TotalTitheListPipe,
    RevenueByDaysComponent,
    RevenueByProductComponent,
  ],
  imports: [
    CommonModule,

    AppRoutingModule,
    InfraModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'move', component: MovingsComponent, canActivate: [AuthGuard] },
      { path: 'contact', component: ContactUsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
      { path: 'debts', component: DebtsComponent },
      { path: 'clock', component: TimeClockComponent, canActivate: [AuthGuard] },
      { path: 'tasks', component: TasksComponent },
      {
        path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], children: [
          { path: '', pathMatch: 'full', redirectTo: 'historyreport' },
          { path: 'debetreport', component: DebtreportComponent },
          { path: 'expensreport', component: ExpensReportComponent },
          { path: 'historyreport', component: HistoryreportComponent },
          { path: 'tithereport', component: TithereportComponent },
          { path: 'incomereport', component: IncomeReportComponent },
          { path: 'movingreports', component: MovingReportsComponent },

        ]
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
    ])
  ]
})

export class HomeModule {

}
