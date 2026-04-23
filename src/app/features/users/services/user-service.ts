import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http:HttpClient = inject(HttpClient)
  private readonly API_URL: string = 'http://localhost:8080/api/users/'

  fetchUserById(id: string) {
    return this.http.get<User>(this.API_URL+id)
  }
}
