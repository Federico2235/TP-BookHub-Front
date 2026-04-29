import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../features/users/services/user-service';
import { AuthService } from '../../features/users/services/auth-service';
import { Role } from '../../features/books/models/role.model';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  if (!authService.isUserLogged()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  const user = userService.loggedUserSignal();

  if (user) {
    return  user.role === Role.ADMIN
      ? true
      : router.createUrlTree(['/']);
  }

  const userId = authService.getUserId();

  if (!userId) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  return userService.fetchUserById(userId).pipe(
    map((loadedUser) => {
      userService.loggedUserSignal.set(loadedUser);

      return  loadedUser.role === Role.ADMIN
        ? true
        : router.createUrlTree(['/']);
    }),
    catchError(() => {
      return of(
        router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url },
        }),
      );
    }),
  );
};
