import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, ReplaySubject, first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NaviService } from 'src/app/services/navi.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    private authService: AuthService,
    private _naviService: NaviService
  ) {}
  isAuth$: Observable<boolean | null> = this.authService.isAuth$.asObservable();
  isOpenedHabitat: boolean = false;
  handleIsOpen() {
    this._naviService.isOpened.next(!this._naviService.isOpened.value);
  }
  logout() {
    this.authService.isAuth$.next(false);
    this.authService.logout().subscribe();
    this.isOpenedHabitat = false;
  }

  ngOnInit(): void {}

  openSignin() {
    this.authService.openSignin$.next(true);
  }
  openMyHabitat() {
    this.isOpenedHabitat = !this.isOpenedHabitat;
  }
  closeHabitatMenu() {
    if (this.isOpenedHabitat) this.isOpenedHabitat = false;
  }
}
