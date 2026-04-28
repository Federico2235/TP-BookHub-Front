import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/users/services/auth-service';
export const profileOwnerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedUserId = authService.getUserId();
  const routeUserId = route.paramMap.get('id');

  if (!loggedUserId) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  if (loggedUserId === routeUserId) {
    return true;
  }

  return router.createUrlTree(['/']);
};
