import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { AuthService } from './features/users/services/auth-service';
import { UserService } from './features/users/services/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('BookHubFront');
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  constructor() {
    const userId = this.authService.getUserId();

    if (userId) {
      this.userService.fetchUserById(userId).subscribe({
        next: (user) => this.userService.loggedUserSignal.set(user),
        error: () => this.authService.logout(),
      });
    }
  }
}
