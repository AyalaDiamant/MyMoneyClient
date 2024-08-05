import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './services/app.interceptor';
import { BackgroundColorDirective } from './directives/background-color.directive';
import { UploadComponent } from './components/upload/upload.component';
import { ListComponent } from './components/list/list.component';
import { OnEnterDirective } from './directives/on-enter.directive';
import { SortByTypePipe } from './pipes/sort-by-type.pipe';




@NgModule({
  declarations: [
  
  
    BackgroundColorDirective,
    UploadComponent,
    ListComponent,
    OnEnterDirective,
    SortByTypePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,

    BackgroundColorDirective,
    UploadComponent,
    ListComponent,
    OnEnterDirective,
    SortByTypePipe
],
})
export class InfraModule { 
    static forRoot(): ModuleWithProviders<InfraModule> {
      return {
          ngModule: InfraModule,
          providers: [
              { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
          ]
      };
  }
}
