import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(message: string) {
    Swal.fire('הצלחת', message, 'success')
  }

  error(message: string) {
    Swal.fire('שגיאה', message, 'error')
  }

  info(message: string) {
    Swal.fire('הודעה', message, 'info')
  }
  warning(message: string) {
    Swal.fire('אזהרה', message, 'warning')
  }
  remove(text: string) {
    return Swal.fire({
      title: 'האם אתה בטוח?',
      text: text + " " + " עומד להימחק " + ", לא תוכל לשחזר זאת !",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'מחק!',
      cancelButtonText: 'בטל'
    });

  }
  removeLender(text: string) {
    return Swal.fire({
      title: 'שים לב!',
      text: "משתמש מסוג " +text + " " + " עומד להימחק " + ", יש לעדכן את המשתמשים שתחתיו",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'מחק!',
      cancelButtonText: 'בטל'
    });

  }


  changeUserType(text: string) {
    return Swal.fire({
      title: 'שים לב!',
      text: "משתמש מסוג " +text + " " + " השתנה " + ", יש לעדכן את המשתמשים שתחתיו",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'הבנתי!',
      cancelButtonText: 'בטל'
    });

  }

  confirm(text: string) {
    return Swal.fire({
      title: 'האם אתה בטוח ?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'אישור',
      cancelButtonText: 'ביטול',
    });

  }
}
