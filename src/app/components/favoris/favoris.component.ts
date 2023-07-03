import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  of,
  catchError,
  tap,
  switchMap,
  take,
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
  @Output() favoriteClicked: EventEmitter<{
    propertyId: number;
    event: Event;
  }> = new EventEmitter<{ propertyId: number; event: Event }>();

  private isFavoriteSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isFavorite$ = this.isFavoriteSubject.asObservable();

  private _unSubScribe: Subscription = new Subscription();

  ngOnInit(): void {
    this._unSubScribe.add(
      this._authService.isAuth$
        .pipe(
          switchMap((x) => {
            if (x) {
              return this._favoriteService.userFavoriteList().pipe(
                tap((data: any) => {
                  this.isFavoriteSubject.next(
                    data.some(
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

  changeFavorite(e: Event) {
    console.log('test de la mort');

    this._authService.isAuth$
      .pipe(
        take(1), // Utilisez take(1) pour ne recevoir qu'une seule valeur de l'observable
        switchMap((auth) => {
          if (auth) {
            return this._favoriteService.favoriteToggle(this.propertyId).pipe(
              tap((data: any) => {
                console.log(data, '------------->data<');
                this.isFavoriteSubject.next(data.data);
              }),
              catchError((error) => {
                console.log(error, '------------->data<');
                if (error.status === 401) {
                  this.isFavoriteSubject.next(false);
                  this._authService.isAuth$.next(false);
                }
                return of(error);
              })
            );
          } else {
            this._authService.openSignin$.next(true);
            return of(false);
          }
        })
      )
      .subscribe();
  }
}
