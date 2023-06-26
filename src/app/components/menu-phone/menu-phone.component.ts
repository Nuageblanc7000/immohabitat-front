import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-phone',
  templateUrl: './menu-phone.component.html',
  styleUrls: ['./menu-phone.component.scss'],
})
export class MenuPhoneComponent {
  @Input() isOpen: boolean = false;
  constructor(private _authService: AuthService) {}
  isAuth: Observable<boolean> = this._authService.isAuth$;

  logout() {
    this._authService.isAuth$.next(false);
    this._authService.logout().subscribe();
  }
}
