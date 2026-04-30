import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { SignupRequest } from '../models/signupRequest.model';
import { SignupResponse } from '../models/signupResponse.model';
import { Role } from '../../books/models/role.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedUserSignal = signal<User | null>(null);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = 'http://localhost:8080/api/users';
  allUsers: WritableSignal<User[]> = signal<User[]>([]);

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.loggedUserSignal.set(null);
  }

  getUsers() {
    const result = this.http.get<User[]>(this.API_URL);
    result.subscribe({
      next: (users) => this.allUsers.set(users),
    });
    return result;
  }

  fetchUserById(id: string) {
    return this.http.get<User>(this.API_URL + '/' + id);
  }

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.API_URL}`, request);
  }

  updateUserRole(userId: number, newRole: Role): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/${userId}/role`, { role: newRole });
  }

  updateLoggedUser() {
    if (localStorage.getItem('id')) {
      this.fetchUserById(localStorage.getItem('id')!).subscribe({
        next: (user) => this.loggedUserSignal.set(user),
      });
    }
  }
}
