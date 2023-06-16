import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  //menu phone
  isOpened: boolean = false;
  isOpen(e: boolean) {
    this.isOpened = e;
  }
}
