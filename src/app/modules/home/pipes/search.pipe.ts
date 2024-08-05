import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  arr:any[];
  transform(value: any[], ...args: unknown[]): any[] {
    this.arr = new Array<any>();
    if(args[0]==null || args[0]==""){
      return value;
    }

    for(let i of value){
      if(i.name.startsWith(args[0])){
         this.arr.push(i);
      }
    }
    return this.arr;
  }

}
