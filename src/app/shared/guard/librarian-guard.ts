import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../features/users/services/user-service';

export const LibrarianGuard: CanActivateFn = (route, state) => {
  return inject(UserService).isUserLibrarian() ? true : inject(Router).navigateByUrl('/');
};
