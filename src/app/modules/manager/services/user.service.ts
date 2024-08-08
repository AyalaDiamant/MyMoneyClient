// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserSearch } from 'src/app/types/user';
import { GResult } from 'src/app/types/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  root: string = environment.rootUrl;
  userSearch: UserSearch = new UserSearch();

  constructor(private http: HttpClient) {}

  fetchUsers() {
    return  this.http.post(this.root + 'Users/GetUsers', this.userSearch).subscribe((res: GResult<User[]>) => {    
      this.users = res.value;
    }); 
  }

  getManagerById(managerId: number) {
    console.log(managerId,'managerId');
    
    return this.users.find(user => user.id === managerId) || null;
  }

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

}
