import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  constructor(private _authService: AuthService, private _router: Router) {}
  user: IUser | null = null;
  unsubscribe: Subscription = new Subscription();
  ngOnInit(): void {
    this.unsubscribe.add(
      this._authService.user$.subscribe({
        next: (user: IUser | null) => {
          if (user) {
            this.user = user;
          }
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
