import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/loginRequest.model';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/authResponse.model';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userService = inject(UserService)
  private apiUrl = 'http://localhost:8080/api/auth';

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,request)
  }

  isUserLogged() {
    return localStorage.getItem("token") !== null;
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem('id')
    this.userService.loggedUserSignal.set(null)
  }

  getUserId() {
    return localStorage.getItem('id');
  }
}
