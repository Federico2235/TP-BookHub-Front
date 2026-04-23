import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/loginRequest.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly userService: UserService = inject(UserService);
  private readonly authApi: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef)
  email: string = '';
  password: string = '';
  message: WritableSignal<string> = signal('');
  token: WritableSignal<string | null> = signal<string | null>(null);

  handleLogin() {
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authApi.login(loginRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.message.set('');

          if (response.token) {
            this.token.set(response.token);

            localStorage.setItem('token', response.token);
            localStorage.setItem('id', response.id);

            this.userService.updateLoggedUser()

            this.router.navigate(['/']);
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
