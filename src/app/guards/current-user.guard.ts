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
        console.log('ici dans le switchmap', user);
        return of(true);
      } else {
        console.log('on injecte le user');
        return authService.fetchCurrentUser().pipe(
          tap((x: any) => {
            if (x.data === null) {
              console.log(x, 'xdata');
              authService.isAuth$.next(false);
            } else {
              console.log(x, 'on injecte ici');
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
