import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Output() isOpen: EventEmitter<boolean> = new EventEmitter();
  isOpened = false;
  handleIsOpen(open: boolean) {
    this.isOpened = open;
    this.isOpen.emit(open);
  }
}
