import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  catchError,
  map,
  of,
  switchMap,
  take,
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

  private isFavoriteSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isFavorite$ = this.isFavoriteSubject.asObservable();
  unsubScribe: Subscription = new Subscription();

  listFavoriteUser: any[] = [];
  private _unSubScribe: Subscription = new Subscription();
  ngOnInit(): void {
    this.unsubScribe.add(
      this._authService.isAuth$
        .pipe(
          switchMap((x) => {
            if (x) {
              return this._favoriteService.userFavoriteList().pipe(
                tap((x: any) => {
                  this.isFavoriteSubject.next(
                    x.data[0].some(
                      (p: any) =>
                        p.isFavorite && p.property.id === this.propertyId
                    )
                  );
                })
              );
            } else {
              this.isFavoriteSubject.next(false);
              return of(false);
            }
          })
        )
        .subscribe()
    );
  }
  ngOnDestroy(): void {
    this._unSubScribe.unsubscribe();
  }
  changeFavorite() {
    console.log('ici');
    //demain on va juste changer le user et ici vérif! avec un observable

    this._authService.isAuth$
      .pipe(
        tap((x) => {
          console.log(x);
        }),
        take(1),
        switchMap((auth) => {
          if (auth) {
            return this._favoriteService.favoriteToggle(this.propertyId).pipe(
              tap((data: any) => this.isFavoriteSubject.next(data.data)),
              catchError((error) => {
                if (error.status === 401) {
                  // L'utilisateur n'est pas authentifié, mettez isAuth à false
                  this.isFavoriteSubject.next(false);
                  this._authService.isAuth$.next(false);
                }
                return of(error);
              })
            );
          } else {
            // L'utilisateur n'est pas authentifié, effectuez les actions nécessaires
            this._authService.openSignin$.next(true);
            return of(false);
          }
        })
      )
      .subscribe();
  }
}
