import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NaviService } from 'src/app/services/navi.service';

@Component({
  selector: 'app-menu-phone',
  templateUrl: './menu-phone.component.html',
  styleUrls: ['./menu-phone.component.scss'],
})
export class MenuPhoneComponent {
  @Input() isOpen: boolean = this._naviService.isOpened.getValue();
  constructor(
    private _authService: AuthService,
    private _naviService: NaviService
  ) {}
  isAuth: Observable<boolean> = this._authService.isAuth$;
  linkclickClose() {
    this._naviService.isOpened.next(false);
  }
  logout() {
    this._authService.isAuth$.next(false);
    this._authService.logout().subscribe();
  }
}
