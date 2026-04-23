import { Routes } from '@angular/router';
import {Home} from './features/books/pages/home/home';
import { BookDetail } from './features/books/pages/book-detail/book-detail';
import { Login } from './features/users/pages/login/login';
import { UserProfile } from './features/users/pages/profile/user-profile/user-profile';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'detail/:id', component: BookDetail},
  {path: 'login', component: Login},
  {path: 'profile', component: UserProfile}
];
