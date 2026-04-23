import {
  DestroyRef,
  inject,
  Injectable,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable, takeUntil } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef)
  private readonly API_URL: string = 'http://localhost:8080/api/users/';
  loggedUserSignal = signal<User | null>(null);

  fetchUserById(id: string) {
    return this.http.get<User>(this.API_URL + id);
  }

  updateLoggedUser() {
    const userId = localStorage.getItem('id')
    console.log(userId)
    if(userId !==null) {
      this.fetchUserById(localStorage.getItem('id')!)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
        next: (user) => this.loggedUserSignal.set(user),
      });
    }
  }
}
