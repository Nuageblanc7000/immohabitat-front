import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, first, take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(private _authService: AuthService, private _router: Router) {}
  private _unsubscribe: Subscription = new Subscription();
  ngOnInit(): void {
    this._unsubscribe.add(
      this._authService.isAuth$.subscribe({
        next: (isUser: boolean) => {
          if (isUser) this._router.navigate(['/']);
        },
      })
    );
  }
  ngOnDestroy(): void {
    this._unsubscribe.unsubscribe;
  }
}
