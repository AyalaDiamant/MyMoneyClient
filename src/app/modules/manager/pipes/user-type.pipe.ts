import { Pipe, PipeTransform } from '@angular/core';
import { IdName } from 'src/app/types/id-name';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: IdName, ...args: unknown[]): string {
 return value.name;
  }

}
