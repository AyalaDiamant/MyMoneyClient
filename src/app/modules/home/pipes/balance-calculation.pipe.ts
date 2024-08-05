import { Pipe, PipeTransform } from '@angular/core';
import { FORMERR } from 'dns';
import { History } from 'src/app/types/history';
import { MovingReport } from 'src/app/types/movingReports';


@Pipe({
  name: 'balanceCalculation'
})
export class BalanceCalculationPipe implements PipeTransform {


  transform(value: MovingReport, ...args: unknown[]): number {
    if (value == null) {
      return null;
    };
    
    return (value.revenues - value.expenses);





  }

}
