import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { el, id, th } from 'date-fns/locale';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import { Doc, searcDoc, searchDoc } from 'src/app/types/doc';
import { IdName } from 'src/app/types/id-name';
import { GResult, Result } from 'src/app/types/result';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(private http: HttpClient, private alert: AlertService,) {

  }
  root: string = environment.rootUrl;
  docList: Doc[] = new Array<Doc>();
  inEdit: boolean = false;
  firstDescription: string;
  searchDocs: searchDoc = new searchDoc();
  urlAddDocument: string = "/AddDocument";
  searchDocument: searcDoc = new searcDoc();
  ngOnInit(): void {
    this.getDocuments();

  }

  getDocuments() {

    this.http.post(this.root + "Document/GetDocuments", this.searchDocs).subscribe((res: GResult<Doc[]>) => {
      this.docList = res.value;
      console.log(this.docList, "doc list");
      this.docList.forEach(element => {
        element.src = this.root + element.src;
        element.srcPreview = this.root + element.srcPreview;
        element.contentType = this.contentType(element.fileName);

      });
    });
  }
  deleteDocument(id: Doc) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((result) => {
      if (result.isConfirmed == true) {
        this.http.delete(this.root + 'Document/DeleteDocument/' + id.id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("מסמך נמחק בהצלחה!");
          }
          this.getDocuments();
        });
      }
    });
  }
  save(d: Doc) {
    let doc = new IdName();
    doc.id = d.id;
    doc.name = d.description;
    this.http.put(this.root + 'Document/UpdateDocument', doc).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("התאור עודכן בהצלחה");
        d.isEdit = false;
      }
      else {
        this.alert.error("קיים כזה אופן תשלום במערכת...");
      }

    });
    this.inEdit = true;
  }

  editDocument(d: Doc) {


    d.isEdit = true;
    this.firstDescription = d.description
    // this.inEdit = false

  }
  show(d: Doc) {
    d.isEdit = false;
  }

  addDocument(obj: FormData) {
    this.getDocuments()
  }
  cancel(d: Doc) {
    d.description = this.firstDescription;
    this.firstDescription = ""
    d.isEdit = false;
    this.inEdit = true;
  }
  contentType(fileName: string) {
    if (fileName.includes('.pdf') || fileName.includes('.png') || fileName.includes('.jpg'))
      return "showBrowser";
    if (fileName.includes('.doc') || fileName.includes('.docx') || fileName.includes('.xlsx') || fileName.includes('.xls'))
      return "download";
    return "showBrowser"
  }


}

