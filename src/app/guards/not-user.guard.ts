import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const notUserConnected: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isAuth$.pipe(
    first((x) => x !== null),
    tap((isAuth) => {
      if (isAuth) {
        // L'utilisateur est connecté, redirigez-le vers une autre page
        router.navigate(['/']);
      }
    }),
    map((isAuth) => !isAuth)
  );
};
