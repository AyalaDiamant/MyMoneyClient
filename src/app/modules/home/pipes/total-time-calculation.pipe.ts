import { Pipe, PipeTransform } from '@angular/core';
import { Presence } from 'src/app/types/presence';

@Pipe({
  name: 'totalTimeCalculation'
})
export class TotalTimeCalculationPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): any {
    if (value == null || value.length == 0) return "";
    let sum: number = 0;
    for (let p of value) {
      var start = Date.parse(p.start);
      var end = Date.parse(p.finish);
      if (end > start)
        sum += end - start;
    }
    return sum;
  }

}
