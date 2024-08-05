import { IdName } from "./id-name";
import { Area } from "./area";

export class Filters {
    areas: Area[];
    payOptions: IdName[] ;
    
    constructor(){
     this.areas== new Array<Area>();   
     this.payOptions== new Array<IdName>();
    }
}
