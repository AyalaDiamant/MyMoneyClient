import { SafeResourceUrl } from "@angular/platform-browser";

export class Doc {
    id:number;
    userId:number;
    content:any;
    contentType:string;
    description:string;
    fileName:string;
    src:SafeResourceUrl;
    isEdit:boolean=false;
    srcPreview:string;
}
export class searchDoc{
    name?:string="";
    description?:string="";
}
export class searcDoc{
    name?:string="";
    description?:string="";
}

