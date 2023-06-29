import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, map, tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { IupdateEmail } from 'src/app/interfaces/IupdateEmail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: ['./form-email.component.scss'],
})
export class FormEmailComponent {
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

  ngOnInit(): void {
    this.formUpdate = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required]],
    });
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

  get email() {
    return this.formUpdate.get('email');
  }
  //amélioaration du système une fois le token et email ok dans le back!
  onSubmitUpdate() {
    this.formUpdate.markAllAsTouched();
    this.globalError = '';
    if (this.formUpdate.valid) {
      this._unsubscribe.add(
        this._userService.updateEmail(this.formUpdate.value).subscribe({
          next: (p: any) => {
            const previousValues: IUser | null =
              this._authService.userSubject.getValue();

            previousValues!.email = p.data.email;
            this._authService.userSubject.next(previousValues);
            this._messageService.add({
              key: 'tc',
              severity: 'success',
              summary: 'Email modifié avec succés',
              detail: 'Votre email à bien été modifié avec succès',
            });
          },
          error: (err) => (this.globalError = err.error?.message),
        })
      );
    }
  }
}
