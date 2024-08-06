import { HttpClient } from '@angular/common/http';

export module App {

  export function loadGlobalScript(src: string) {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = src;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  export function createFormData(data: any, ...fileData: { files: any[], name: string }[]) {
    const formData = new FormData();

    for (var key in data) {
      if (Array.isArray(data[key])) {
        for (let i = 0; i < data[key].length; i++) {
          formData.append(key + '[]', data[key][i].toString());
        }
      }
      else {
        formData.append(key, data[key].toString());
      }
    }
    for (let i = 0; i < fileData.length; i++) {
      for (let j = 0; j < fileData[i].files.length; j++) {
        formData.append(fileData[i].name, fileData[i].files[j]);
      }
    }
    return formData;
  }

  //   export function downloadFile(http: HttpClient, url: string, params: any, fileType: FileType, download = true) {
  //       let type: string;

  //       switch (fileType) {
  //           case FileType.excel:
  //               type = 'application/ms-excel';
  //               break;
  //           case FileType.pdf:
  //               type = 'application/pdf';
  //               break;
  //           case FileType.zip:
  //               type = 'application/zip';
  //               break;
  //       }

  //       return http.post(url, params, { responseType: 'arraybuffer', observe: 'response' }).subscribe((res: any) => {
  //           if (res.status == 200) {
  //               var blob = new Blob([(res.body)], { type: type });
  //               var a = document.createElement('a');
  //               a.id = 'temp_elem';

  //               var fileUrl = window.URL.createObjectURL(blob);

  //               a.href = fileUrl;
  //               var timeout = 1000 * 60 * 3;

  //               if (download) {
  //                   var filename;
  //                   var disposition = res.headers.get("content-disposition");
  //                   if (disposition && disposition.indexOf('attachment') !== -1) {
  //                       var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  //                       var matches = filenameRegex.exec(disposition);
  //                       if (matches != null && matches[1]) {
  //                           filename = matches[1];
  //                       }
  //                   }
  //                   filename = decodeURIComponent(filename).replace("UTF-8''", '').replace('+', ' ').trim(); //decode here

  //                   a.download = filename;
  //                   timeout = 0;
  //               }
  //               else {
  //                   a.target = '_blank';
  //               }
  //               a.click();

  //               setTimeout(() => {
  //                   window.URL.revokeObjectURL(fileUrl);
  //               }, timeout);

  //               return true;
  //           }
  //           return false;
  //       });
  //   }
  export function downloadFile(http: HttpClient, url: string, params: any, fileType: FileType, download = true) {
    let type: string;

    switch (fileType) {
      case FileType.excel:
        type = 'application/ms-excel';
        break;
      case FileType.pdf:
        type = 'application/pdf';
        break;
      case FileType.zip:
        type = 'application/zip';
        break;
    }

    return http.post(url, params, { responseType: 'arraybuffer', observe: 'response' }).subscribe((res: any) => {
      if (res.status == 200) {
        var blob = new Blob([(res.body)], { type: type });
        var a = document.createElement('a');
        a.id = 'temp_elem';
        var fileUrl = window.URL.createObjectURL(blob);
        a.href = fileUrl;
        var timeout = 1000 * 60 * 3;

        if (download) {
          var filename;
          var disposition = res.headers.get("content-disposition");
          if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
              filename = matches[1];
            }
          }
          filename = decodeURIComponent(filename).replace("UTF-8''", '').replace('+', ' ').trim(); //decode here
          a.download = filename;
          timeout = 0;
        } else {
          a.target = '_blank';
        }
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(fileUrl);
        }, timeout);
        return true;
      }
      return false;
    });
  }

  export enum FileType {
    excel = 0,
    pdf = 1,
    zip = 2
  }
}
