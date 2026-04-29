import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('Original request:', req);
  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Request with token:', authReq);
  console.log('Authorization header:', authReq.headers.get('Authorization'));

  return next(authReq);
};
