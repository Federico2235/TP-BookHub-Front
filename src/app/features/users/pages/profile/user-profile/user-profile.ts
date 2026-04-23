import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [JsonPipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  private readonly userService: UserService = inject(UserService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly userId: string | null = this.route.snapshot.paramMap.get('id');
  protected user: Signal<User | undefined> = toSignal(this.userService.fetchUserById(this.userId!));
}
