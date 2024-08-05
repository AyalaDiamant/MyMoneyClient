import { Pipe, PipeTransform } from '@angular/core';
import { IdName } from 'src/app/types/id-name';
import { Area } from 'src/app/types/area';

@Pipe({
  name: 'sortArrIsExist'
})
export class SortArrIsActivePipe implements PipeTransform {

  transform(value: IdName[], ...args: any[]): IdName[] {
    //args:  args[0] = areas[],  args[1] isEditMode, args[2] currentAreaId
    let areas:Area[] = args[0];
    let inEditMode = args[1];
    let currentAreaId = args[2];
    let list: IdName[] = new Array<IdName>();
    let flag: boolean;

    if (value == null || value.length == 0) {
      return value;
    }

    value.forEach(element1 => {
      flag = true;
      areas.forEach(element2 => {
        let ans = element1.name == element2.description;
        if ((!inEditMode && ans) || (inEditMode && element1.id != currentAreaId && ans )) {
          flag = false;
        }
      });
      if (flag == true) {
        list.push(element1)
      }
    });

    return list
  }
}


