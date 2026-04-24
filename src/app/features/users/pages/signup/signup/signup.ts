import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {SignupRequest} from '../../../models/signupRequest.model';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth-service';
import {UserService} from '../../../services/user-service';
import {form} from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  protected readonly FormsModule = FormsModule;

  // j'ai fait un model signupRequest
  firstName: string ='';
  lastName: string ='';
  email: string = '';
  password: string = '';
  confirmedPassword: string = '';

  constructor(private router: Router, private userApi: UserService) {}

  handleSignup(){
    const signupRequest: SignupRequest = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: "MEMBER"
    };
    console.log(signupRequest);
    this.userApi.signup(signupRequest).subscribe({
      next: async (response) => {
        await this.router.navigate(['login']);
      }
    })
  }
}
