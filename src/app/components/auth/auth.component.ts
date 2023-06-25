import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private _authService: AuthService, private _fb: FormBuilder) {}
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
      this._authService.signin(this.formSignin.value).subscribe({
        error: () => (this.globalError = 'Mot de passe ou email inccorecte'),
      });
    }
  }
  closeSignin(event: Event) {
    event.stopImmediatePropagation();
    this._authService.openSignin$.next(false);
  }
}
