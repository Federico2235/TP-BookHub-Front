import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/users/services/auth-service';
import { User } from '../../features/users/models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../features/users/services/user-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly userService = inject(UserService)
  userId = this.authService.getUserId();
  protected user: Signal<User | undefined> = toSignal(this.userService.fetchUserById(this.userId!));

  isUserLogged() {
    return this.authService.isUserLogged();
  }

  logout() {
    this.authService.logout();
  }

  navigateToProfile() {
    if (this.userId) {
      this.router.navigate(['profile', this.userId]);
    }
  }
}
