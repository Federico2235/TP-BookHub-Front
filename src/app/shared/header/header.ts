import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../features/users/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private readonly authService: AuthService = inject(AuthService);
  userId = this.authService.getUserId();

  isUserLogged(){
    return this.authService.isUserLogged()
  }

  logout() {
    this.authService.logout()
  }
}
