import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../features/users/services/auth-service';
import { UserService } from '../../features/users/services/user-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly userService = inject(UserService);

  protected loggedUser = this.userService.loggedUserSignal

  isLibrarian(): boolean{
    const user = this.loggedUser();
    return user?.role === "LIBRARIAN";
  }

  isAdmin(): boolean{
    const user = this.loggedUser();
    return user?.role === "ADMIN";
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToProfile() {
      this.router.navigate(['profile']);
  }
}
