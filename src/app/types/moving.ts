import { IdName, IdNameDB } from "./id-name";

export class Moving {
    id: number;
    index: number;
    userArea: IdName;
    common: string = "";
    sum: number;
    payOption: IdName;
    inEdit:boolean = false;
    duplicate: boolean = false;
    date:Date;
    isDeviation:boolean = false;
    constructor(){
        this.userArea = new IdName();
        
    }

    
}


