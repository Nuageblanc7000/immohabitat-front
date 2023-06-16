import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-phone',
  templateUrl: './menu-phone.component.html',
  styleUrls: ['./menu-phone.component.scss'],
})
export class MenuPhoneComponent {
  @Input() isOpen = false;
}
