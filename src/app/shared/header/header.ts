import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/users/services/auth-service';
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
  private readonly userService = inject(UserService);
  protected userId = this.authService.getUserId();
  protected loggedUser = this.userService.loggedUserSignal

  logout() {
    this.authService.logout();
  }

  navigateToProfile() {
    if (this.userId) {
      this.router.navigate(['profile', this.userId]);
    }
  }
}
