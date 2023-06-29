import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss'],
})
export class FormProfilComponent {
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
  user: IUser | null = null;
  //getter form input

  ngOnInit(): void {
    this._authService.user$.subscribe({
      next: (user: IUser | null) => {
        this.user = user;
      },
    });
    this.formUpdate = this._fb.group({
      firstname: [this.user?.firstname, Validators.required],
      lastname: [this.user?.lastname, Validators.required],
      phone: [this.user?.phone, [Validators.pattern(/^\+\d{11}$/)]],
    });
  }
  ngOnDestroy(): void {
    this._unsubscribe.unsubscribe();
  }

  //getter form
  get firstname() {
    return this.formUpdate.get('firstname');
  }
  get lastname() {
    return this.formUpdate.get('lastname');
  }
  get phone() {
    return this.formUpdate.get('phone');
  }
  // get email() {
  //   return this.formUpdate.get('email');
  // }

  onSubmitUpdate() {
    this.formUpdate.markAllAsTouched();
    this.globalError = '';
    if (this.formUpdate.valid) {
      this._userService.updateProfil(this.formUpdate.value).subscribe({
        next: (p: any) => {
          this._authService.userSubject.next(p.data),
            this._messageService.add({
              key: 'tc',
              severity: 'success',
              summary: 'Profil modifié avec succés',
              detail: 'Votre profil à bien été modifié avec succès',
            });
        },
        error: (err) => console.log(err),
      });
    }
  }
}
