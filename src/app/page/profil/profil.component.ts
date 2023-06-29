import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Observable, Subscription, first, take } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnDestroy, OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _confirmService: ConfirmationService
  ) {}
  user: IUser | null = null;
  unsubscribe: Subscription = new Subscription();
  ngOnInit(): void {
    this.unsubscribe.add(
      this._authService.user$.subscribe({
        next: (user: IUser | null) => {
          if (user) {
            this.user = user;
          } else {
            this._router.navigate(['/']);
          }
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  confirm() {
    this._confirmService.confirm({
      message: 'êtes vous sur de vouloir supprimer votre compte?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.unsubscribe.add(this._authService.softDelete().subscribe());
      },
      reject: (type: ConfirmEventType) => {},
    });
  }
}
