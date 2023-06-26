import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}
  formSignin!: FormGroup;
  isOpen: BehaviorSubject<boolean> = this._authService.openSignin$;
  globalError: string = '';

  ngOnInit(): void {
    this.formSignin = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
          ),
        ],
      ],
    });
  }
  onFormSigninSubmit() {
    if (this.formSignin.valid) {
      this._authService
        .signin(this.formSignin.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.globalError = '';
          },
          error: () => (this.globalError = 'Mot de passe ou email inccorecte'),
        });
    }
  }
  closeSignin(event: Event) {
    event.stopImmediatePropagation();
    this._authService.openSignin$.next(false);
  }

  redirectSignup() {
    this._authService.openSignin$.next(false);
    this._router.navigate(['signup']);
  }
}
