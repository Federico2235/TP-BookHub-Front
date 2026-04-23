import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/users/services/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isUserLogged() ? true : inject(Router).navigateByUrl('/login');
};
