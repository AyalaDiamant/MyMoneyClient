import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'timeCalculation'
})
export class TimeCalculationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == null || args[0] == null)
      return null;
    var start = Date.parse(value);
    var end = Date.parse(args[0]);
    let totalHours = NaN;
    if (start < end) {
      totalHours = end - start;
    }
    return totalHours;
  }

}


