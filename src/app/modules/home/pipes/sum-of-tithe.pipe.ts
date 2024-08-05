import { Pipe, PipeTransform } from '@angular/core';
import { Tithe } from 'src/app/types/tithe';

@Pipe({
  name: 'sumOfTithe'
})
export class SumOfTithePipe implements PipeTransform {

  transform(calculateTithe: Tithe): number {
    return (calculateTithe.sumOfRevenues /10) - calculateTithe.sumOfExpenses;
  }

}
