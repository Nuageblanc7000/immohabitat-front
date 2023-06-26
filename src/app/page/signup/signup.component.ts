import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, first, take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}
  private _unsubscribe: Subscription = new Subscription();
  formSignup!: FormGroup;
  ngOnInit(): void {
    this.formSignup = this._fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
    });
    this._unsubscribe.add(
      this._authService.isAuth$
        .pipe(
          tap((p: boolean) => {
            if (p) {
              console.log(p, 'ici---->');
              this._router.navigate(['/']);
            }
          })
        )
        .subscribe()
    );
  }
  ngOnDestroy(): void {
    this._unsubscribe.unsubscribe();
  }
}
