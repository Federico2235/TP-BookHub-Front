import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/loginRequest.model';
import {Router, RouterLink} from '@angular/router';
import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly userService: UserService = inject(UserService);
  private readonly authApi: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  email: string = '';
  password: string = '';
  message: WritableSignal<string> = signal('');
  token: WritableSignal<string | null> = signal<string | null>(null);

  handleLogin() {
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authApi.login(loginRequest).subscribe({
      next: (response) => {
        this.message.set('');

        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);

          this.userService.fetchUserById(response.id).subscribe({
            next: (user) => {
              this.userService.loggedUserSignal.set(user);
              this.router.navigate(['/']);
            },
            error: () => {
              this.router.navigate(['/']);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error en login', err);
        this.token.set(null);
        this.message.set(err?.error?.message);
      },
    });
  }
}
