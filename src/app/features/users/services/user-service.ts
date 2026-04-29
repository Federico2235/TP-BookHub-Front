import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {SignupRequest} from '../models/signupRequest.model';
import {SignupResponse} from '../models/signupResponse.model';
import {Role} from '../../books/models/role.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedUserSignal = signal<User | null>(null)
  private readonly http:HttpClient = inject(HttpClient)
  private readonly API_URL: string = 'http://localhost:8080/api/users'

  fetchUserById(id: string) {
    return this.http.get<User>(this.API_URL+'/'+id)
  }

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.API_URL}`,request)
  }

  isUserAdmin(){
    return true;
  }
  isUserLibrarian(){
    console.log(this.loggedUserSignal()?.role); // -> donne un undefined
    return this.loggedUserSignal()?.role == Role.LIBRARIAN ;
  }
}
