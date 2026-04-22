import { Component, signal } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/loginRequest.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  message= signal ('');
  token = signal<string | null>(null);
  constructor(
    private authApi: AuthService,
    private router: Router,
  ) {}

  handleLogin() {
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authApi.login(loginRequest).subscribe({
      next: async (response) => {
        this.token.set(response.token);
        this.message.set('');
        if (response.token) {
          localStorage.setItem('token', response.token);
          await this.router.navigate(['/']);
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
