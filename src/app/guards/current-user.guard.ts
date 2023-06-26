import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  Observable,
  catchError,
  first,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';

export const dataUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    take(1),
    switchMap((user: IUser | null) => {
      if (user) {
        return of(true);
      } else {
        return authService.fetchCurrentUser().pipe(
          tap((x: any) => {
            if (x.data === null) {
              console.log(x.data, 'je viens ici ---->');
              authService.isAuth$.next(false);
            } else {
              console.log('ici plutot');
              authService.userSubject.next(x.data);
              authService.isAuth$.next(true);
            }
          }),
          map(() => true)
        );
      }
    })
  );
};
