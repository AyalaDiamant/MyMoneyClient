import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/types/user';

@Pipe({
  name: 'sortActiveUser'
})
export class SortActiveUserPipe implements PipeTransform {
  users: User[];

  transform(value: any[], ...args: boolean[]): User[] {
    this.users = new Array<any>();
    if (value == null) {
      return null;
    }
    if (args[0] == true) {

      return value;
    }
    else if (args[0] == false) {
      for (let i of value) {
        if (i.isActive) {
          this.users.push(i)
        }
      }
      return this.users;
    }
  }

}

