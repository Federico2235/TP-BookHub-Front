import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SignupRequest} from '../../../models/signupRequest.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule
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


  constructor(private router: Router/*passer le signup service*/) {

  }

  handleSignup(){
    const singupRequest: SignupRequest = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };


  }
}
