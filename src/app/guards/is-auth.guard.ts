import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { first, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const IsAuthGuard: CanActivateFn = () => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  return _authService.isAuth$.pipe(
    take(1),
    tap((p: boolean) => {
      if (p) {
        console.log(p, 'p ??');
        return false;
      } else {
        console.log('prob ici ?');
        _router.navigate(['/']);
        _authService.openSignin$.next(true);
        return false;
      }
    })
  );
};
