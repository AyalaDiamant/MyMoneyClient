import { TableCode } from "./table-code";

export class IdName {
    id: number;
    name: string ="";
    managerId?:number;
    inEdit: boolean = false;
    isActive?: boolean;
    type?:number;


}

export class IdNameDB extends IdName{
    forEach(arg0: (element: any) => void) {
      throw new Error('Method not implemented.');
    }
    tableCode:TableCode;
    
}
