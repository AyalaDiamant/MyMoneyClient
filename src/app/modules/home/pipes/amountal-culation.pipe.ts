import { Pipe, PipeTransform } from '@angular/core';
import { moovingType } from 'src/app/types/enums';
import { Moving } from 'src/app/types/moving';


@Pipe({
  name: 'amountalCulation'
})
export class AmountalCulationPipe implements PipeTransform {

  transform(value: Moving[], ...args: number[]): number {
    let sum1: number = 0;
    let sum2: number = 0;
    // let typeMove: moovingType;

    if (value == null || value.length == 0) {
      return null;
    }

    for (let i of value) {
      if (i.userArea.type == 1) {
        sum1 += i.sum;
        // typeMove = moovingType.revenues;
      }
      if (i.userArea.type == 2){
        sum2 += i.sum;
        // typeMove = moovingType.expenses;
      }
    }

    if (args[0] == 1)
      return sum1;
    if (args[0] == 2)
      return sum2;
    return sum1 - sum2;
  }
}


