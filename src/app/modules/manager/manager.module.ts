import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { RouterModule } from '@angular/router';
import { IsManagerGuard } from '../infra/services/is-manager.guard';
import { BoolConvertPipe } from './pipes/bool-convert.pipe';
import { UserTypePipe } from './pipes/user-type.pipe';
import { InfraModule } from '../infra/infra.module';
import { SortActiveUserPipe } from './pipes/sort-active-user.pipe';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { SortArrPipeManager } from './pipes/sort-arrMennager.pipe';
import { IsPermissionGuard } from '../infra/services/is-permission.guard';
import { WebsiteDesignComponent } from './components/website-design/website-design.component';
import { ManagerSettingsComponent } from './components/manager-setting/manager-setting.component';


@NgModule({
  declarations: [ UsersComponent, BoolConvertPipe, UserTypePipe, SortActiveUserPipe,SortArrPipeManager, AdminSettingsComponent, WebsiteDesignComponent, ManagerSettingsComponent],
  imports: [
    CommonModule,
    InfraModule.forRoot(),
    RouterModule.forChild([
      {path : 'users',component:UsersComponent,canActivate:[IsPermissionGuard]},
      {path : 'settings',component:AdminSettingsComponent,canActivate:[IsManagerGuard]},
      {path : 'website-design',component:WebsiteDesignComponent,canActivate:[IsManagerGuard]},
      {path : 'manager-setting',component:ManagerSettingsComponent,canActivate:[IsManagerGuard]}
    ])
  ]
})
export class ManagerModule { }
