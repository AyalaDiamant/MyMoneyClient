import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = "yellow";
  }
  // @Input() appBackgroundColor;
  @Output() appBackgroundColor = new EventEmitter<string>();

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor("red");
    this.appBackgroundColor.emit();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor("yellow")
  }

  setBackgroundColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }



}
