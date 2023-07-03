import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, first, of, take, tap, timeout } from 'rxjs';
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
  globalError: string = '';
  complete: boolean = false;
  //getter form input

  ngOnInit(): void {
    this.formSignup = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this._unsubscribe.add(
      this._authService.isAuth$
        .pipe(
          tap((p: boolean) => {
            if (p) {
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

  //getter form
  get firstname() {
    return this.formSignup.get('firstname');
  }
  get lastname() {
    return this.formSignup.get('lastname');
  }
  get password() {
    return this.formSignup.get('password');
  }
  get email() {
    return this.formSignup.get('email');
  }

  onSubmitSignup() {
    this.formSignup.markAllAsTouched();
    this.globalError = '';
    if (this.formSignup.valid) {
      this._authService.signup(this.formSignup.value).subscribe({
        next: () => {
          let timeOut: any = undefined;
          this.complete = true;
          timeOut = setTimeout(() => {
            this.complete = false;
            this._router.navigate(['/']);

            clearTimeout(timeOut);
          }, 5000);
        },
        error: (err) => {
          this.globalError = err.error.message;
        },
      });
    }
  }
}
