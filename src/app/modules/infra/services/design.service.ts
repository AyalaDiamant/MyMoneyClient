import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ManagerDesign } from 'src/app/types/manager-design';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
 private designSubject = new BehaviorSubject<ManagerDesign>(new ManagerDesign());
  currentDesign$ = this.designSubject.asObservable();

  updateDesign(newDesign: ManagerDesign) {    
    this.designSubject.next(newDesign);
  }
}

