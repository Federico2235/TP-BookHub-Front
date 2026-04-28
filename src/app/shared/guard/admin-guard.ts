import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../features/users/services/user-service';


export const adminGuard: CanActivateFn = (route, state) => {
  return inject(UserService).isUserAdmin() ? true : inject(Router).navigateByUrl('');
}
