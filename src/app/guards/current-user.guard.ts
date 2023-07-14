import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, of, switchMap, take, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';

export const dataUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    take(1),
    switchMap((user: IUser | null) => {
      if (user) {
        console.log(' user', user);
        return of(true);
      } else {
        return authService.fetchCurrentUser().pipe(
          tap((x: any) => {
            if (x.data === null) {
              console.log('pas de user');
              authService.isAuth$.next(false);
            } else {
              authService.userSubject.next(x.data.user);
              authService.isAuth$.next(true);
            }
          }),
          map(() => true)
        );
      }
    })
  );
};
