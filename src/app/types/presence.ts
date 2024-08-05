export class Presence {
    id:number;
    start:Date;
    finish:Date;
    note:string;
    inEdit:boolean=false;
}
export class PresenceSearch {
   
    from?:Date;
    to?:Date;
  
}
