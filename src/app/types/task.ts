import { data } from "jquery";
import { IdName } from "./id-name";

export class Task {
    id: number;
    description: string;
    userId: number;
    status: IdName;
    createDate: Date;
    comments: string ="" ;
    urgency: IdName;
    doDate: Date;
    inEdit:boolean;

    constructor() {
        this.status = new IdName();
        this.urgency = new IdName();
        this.createDate= new Date();
        this.status.id=0;
        this.urgency.id=0;
    }
}

export class TaskSearch{
    description: string;
    comments: string;
    urgency: string;
    status: string;
    createDate: Date;
    doDate: Date;
    
    constructor(){
         this.createDate=new Date()
         this.doDate=new Date()

         this.description = "";
         this.comments = "";
         this.urgency = "";
         this.status = "";
         
     }
}




