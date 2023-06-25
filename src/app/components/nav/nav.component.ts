import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Output() isOpen: EventEmitter<boolean> = new EventEmitter();
  constructor(private authService: AuthService) {}
  isAuth$: Observable<boolean | null> = this.authService.isAuth$.asObservable();
  isOpened = false;
  handleIsOpen(open: boolean) {
    this.isOpened = open;
    this.isOpen.emit(open);
  }
}
