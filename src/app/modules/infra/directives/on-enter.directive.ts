import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOnEnter]'
})
export class OnEnterDirective {

  constructor(private el: ElementRef) {

  }
  @Output() appOnEnter = new EventEmitter<string>()
  @HostListener('keypress', ['$event']) onKeyPress(e) {
    
    if (e.charCode == 13) {
      
      this.appOnEnter.emit();
    };
       
  }


}

