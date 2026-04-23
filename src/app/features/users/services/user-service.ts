import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient)
  private readonly API_URL: string = 'http://localhost:8080/api/users/'
  loggedUserSignal = signal<User | null>(null)

  fetchUserById(id: string) {
    return this.http.get<User>(this.API_URL+id)
  }
}
