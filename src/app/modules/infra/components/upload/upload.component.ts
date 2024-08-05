import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GResult, Result } from 'src/app/types/result';
import { AlertService } from '../../services/alert.service';
import { environment } from 'src/environments/environment';
//import { FileToSave } from 'src/app/types/file-to-save';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  // fileName = '';
  file: File;
  formData: FormData = new FormData();
  description: string = "";
  //fileToSave: FileToSave = new FileToSave();
  @Output() refresh = new EventEmitter<string>();
  @Output() onChangeFile = new EventEmitter<File>();
  @Input() isShowDescription: boolean;
  @Input() urlUpload: string;
  root: string = environment.rootUrl + 'Document';
  @ViewChild('inputFile') myInputVariable: ElementRef;
  constructor(private http: HttpClient, private alert: AlertService) {
  };

  ngOnInit(): void {

  }
  // letterOnly(event) : Boolean{
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && (charCode < 224 || charCode> 250))  {
  //     return false;
  //   }
  //   return true;
  // }

  incoming(event) {
    this.file = event.target.files[0];
    // this.formData.append("file", this.file);
    console.log(  this.file, '  this.file');
    
    this.onChangeFile.emit(this.file);
  }

  upLoadDocument() {
    this.formData = new FormData();
    this.formData.append("file", this.file);
    this.formData.append("description", this.description);
    this.description = '';
    this.file = null;
    this.myInputVariable.nativeElement.value = "";



    this.http.post(this.root + this.urlUpload, this.formData).subscribe((res: GResult<number>) => {
      if (res.success) {
        this.alert.success("מסמך נשמר בהצלחה");
        this.refresh.emit();
      }
      else {
        if (res.value == -1) {
          this.alert.error("כבר קיים קובץ כזה במערכת");
        }
        else
          if (res.value == -1) {
            this.alert.error("לא צרפת קובץ");
          }
      }
    });
  }
}
