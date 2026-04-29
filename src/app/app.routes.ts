import { Routes } from '@angular/router';
import {Home} from './features/books/pages/home/home';
import { BookDetail } from './features/books/pages/book-detail/book-detail';
import { Login } from './features/users/pages/login/login';
import { UserProfile } from './features/users/pages/profile/user-profile/user-profile';
import { authGuardGuard } from './shared/guard/auth-guard-guard';
import {Signup} from './features/users/pages/signup/signup/signup';
import { LibrarianBoard } from './features/users/pages/librarian-board/librarian-board';
import { profileOwnerGuard } from './shared/guard/profile-owner-guard';
import { librarianGuard } from './shared/guard/librarian-guard';
import { AdminBoard } from './features/users/pages/admin-board/admin-board';
import { adminGuard } from './shared/guard/admin-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'detail/:id',
    component: BookDetail,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'profile/:id',
    component: UserProfile,
    canActivate: [authGuardGuard, profileOwnerGuard],
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'librarian/board',
    component: LibrarianBoard,
    canActivate: [authGuardGuard, librarianGuard],
  },
  {
    path: 'admin/board',
    component: AdminBoard,
    canActivate: [authGuardGuard,adminGuard],
  },
];
