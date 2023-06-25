import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, first, map, of, switchMap, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';

export const dataUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    // first(),
    switchMap((user: IUser | null) => {
      if (user) {
        authService.isAuth$.next(true);
        return of(true);
      } else {
        authService.isAuth$.next(true);

        return authService.fetchCurrentUser().pipe(
          tap((x: any) => {
            authService.userSubject.next(x.data);
            authService.isAuth$.next(true);
          }),
          map(() => true),
          catchError(() => {
            authService.isAuth$.next(false);
            return of(true);
          })
        );
      }
    }),
    catchError(() => {
      authService.isAuth$.next(false);
      return of(true);
    })
  );
};
