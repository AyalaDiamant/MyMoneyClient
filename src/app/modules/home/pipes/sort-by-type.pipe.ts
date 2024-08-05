import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByType'
})
export class SortByTypePipe implements PipeTransform {

  arr: any[];
  transform(value: any[], ...args: number[]): any[] {
    this.arr = new Array<any>();
    if (value == null) {
      return null;
    }
    if (args == null || args[0] == null|| args[0]==0 ) {
      return value;
    }

    for (let i of value) {
        if (i.type == args[0]) {
          this.arr.push(i);
        }
    }
    return this.arr;

  }

}
