import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Subscription,
  catchError,
  filter,
  first,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { favoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss'],
})
export class FavorisComponent implements OnInit, OnDestroy {
  constructor(
    private _favoriteService: favoriteService,
    private _authService: AuthService
  ) {}
  @Input() maxWidth: number = 80;
  @Input() height: number = 80;
  @Input() propertyId!: number;

  isFavorite: boolean = false;
  isUser: boolean = false;
  listFavoriteUser: any[] = [];
  private _unSubScribe: Subscription = new Subscription();
  ngOnInit(): void {
    this._unSubScribe.add(
      this._authService.isAuth$.pipe(first()).subscribe({
        next: (b: boolean) => {
          this.isUser = b;
          if (this.isUser) {
            this._favoriteService.userFavoriteList().subscribe({
              next: (data: any) => {
                this.listFavoriteUser = data.data[0];
                this.isFavorite = this.listFavoriteUser.some(
                  (p) => p.isFavorite && p.property.id === this.propertyId
                );
              },
            });
          }
        },
      })
    );
  }
  ngOnDestroy(): void {
    this._unSubScribe.unsubscribe();
  }
  changeFavorite() {
    //demain on va juste changer le user et ici vérif! avec un observable
    this._authService.isAuth$
      .pipe(
        tap((auth) => {
          this.isUser = auth;
        }),
        switchMap((auth) => {
          if (auth) {
            return this._favoriteService.favoriteToggle(this.propertyId).pipe(
              first(),
              tap((data: any) => (this.isFavorite = data.data)),
              catchError((x) => {
                this._authService.isAuth$.next(false);
                return of(x);
              })
            );
          } else {
            this._authService.openSignin$.next(true);
            return of(false);
          }
        })
      )
      .subscribe();
    // if (this.isUser) {

    //   this.isFavorite = !this.isFavorite;
    //   this._favoriteService
    //     .favoriteToggle(this.propertyId)
    //     .pipe(
    //       first(),
    //       catchError((x) => {
    //         console.log(x, '--------Q', this.isUser);
    //         this._authService.isAuth$.next(false);
    //         return of(x);
    //       })
    //     )
    //     .subscribe({
    //       next: (data: any) => (this.isFavorite = data.data),
    //     });
    // } else {
    //   console.log('ici');
    //   this._authService.openSignin$.next(true);
    // }
  }
}
