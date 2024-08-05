import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchIsActive'
})
export class SearchIsActivePipe implements PipeTransform {

  arr: any[];
  transform(value: any[], ...args: unknown[]): unknown {
    this.arr = new Array<any>();
    if (value == null) {
      return null;
    }
    for (let i of value) {
      if (i.isActive) {
        this.arr.push(i)
      }

    }
    return this.arr;
  }

}
