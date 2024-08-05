import { Pipe, PipeTransform } from '@angular/core';
import { Tithe } from 'src/app/types/tithe';

@Pipe({
  name: 'totalTitheList'
})
export class TotalTitheListPipe implements PipeTransform {

  transform(titheList: Array<Tithe>, ...args: unknown[]): number {
    let sum = 0;
    titheList.forEach(t => {
      sum += ((t.sumOfRevenues / 10) - t.sumOfExpenses);
    });
    return sum;
  }

}
