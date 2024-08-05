import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'console';
import { ProductsRevenuesExpanded } from 'src/app/types/expanded-revenues';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): number {
    let sum: number = 0;
    if (value == null || value.length == 0) {
      console.log("value in pipe null");
      
      return null;
    }

    for (let i of value) {
      if (i instanceof ProductsRevenuesExpanded) {
        console.log("in pipe");
        
        if (i.productValue) {
          sum += i.productValue;
        }
      } else {
        if (i.sum != null && (i.isActive || i.isActive == undefined)) {
          sum += i.sum
        }
      }
    }
    return sum;
  }

}
