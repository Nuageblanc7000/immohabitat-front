import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { first, take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit(): void {
    this._authService.isAuth$
      .pipe(
        first(),
        tap((x: boolean) => {
          if (x) {
            console.log(x);
            this._router.navigate(['/']);
          }
        })
      )
      .subscribe();
  }
}
