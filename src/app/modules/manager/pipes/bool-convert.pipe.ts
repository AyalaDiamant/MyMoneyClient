import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolConvert'
})
export class BoolConvertPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    if(value){
      return "V";
    }
    return "X";
   }

}
