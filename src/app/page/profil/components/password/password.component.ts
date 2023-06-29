import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/validators/confirm-password.validators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _userService: UserService,
    private _messageService: MessageService
  ) {}
  private _unsubscribe: Subscription = new Subscription();
  formUpdate!: FormGroup;
  globalError: string = '';
  //getter form input

  //

  ngOnInit(): void {
    this.formUpdate = this._fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    );
    this._unsubscribe.add(
      this._authService.isAuth$
        .pipe(
          tap((p: boolean) => {
            if (!p) {
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

  get password() {
    return this.formUpdate.get('password');
  }
  get confirmPassword() {
    return this.formUpdate.get('confirmPassword');
  }
  //amélioaration du système une fois le token et email ok dans le back!
  onSubmitUpdate() {
    this.formUpdate.markAllAsTouched();
    this.globalError = '';
    if (this.formUpdate.valid) {
      const { confirmPassword, ...rest } = this.formUpdate.value;
      this._unsubscribe.add(
        this._userService.updatePassword(rest).subscribe({
          next: (p: any) => {
            this._messageService.add({
              key: 'tc',
              severity: 'success',
              summary: 'mot de passe modifié avec succés',
              detail: 'Votre mot de passe à bien été modifié avec succès',
            });
          },
          error: (err) => (this.globalError = err.error?.message),
        })
      );
    }
  }
}
