import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProp'
})
export class SortPropPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any[] {
    if (value == null) {
      return;
    }
    if (value[0] && args[0] && value[0][args[0]] instanceof Object)
      value.sort((a, b) => (a[args[0]]['id'] > b[args[0]]['id']) ? 1 : -1);
    else {
      value.sort((a, b) => (a[args[0]] > b[args[0]]) ? 1 : -1)
    }
    return value;
  }
}
