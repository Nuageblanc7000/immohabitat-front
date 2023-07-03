import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
})
export class OutsideClickDirective {
  @Output() appOutsideClick = new EventEmitter();
  @Input() isOpen = false;
  constructor(private elementRef: ElementRef) {
    console.log('ok');
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    if (this.isOpen) {
      const clickedInside = this.elementRef.nativeElement.contains(target);
      if (!clickedInside) {
        console.log('ok!!');
        this.appOutsideClick.emit();
      }
    }
  }
}
