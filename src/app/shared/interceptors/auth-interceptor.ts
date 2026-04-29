import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../features/users/services/user-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const userService = inject(UserService);
  if (!token) {
    return next(req);
  }
  const isAuthRequest =
    req.url.includes('/api/auth') ||
    (req.method === 'POST' && req.url.endsWith('/api/users'));

  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if ((error.status === 401 || error.status === 403) && !isAuthRequest) {

        userService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );

  return next(authReq);
};
