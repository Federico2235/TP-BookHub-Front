import { Component, computed, inject, signal, Signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { Role } from '../../../books/models/role.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-board',
  imports: [FormsModule],
  templateUrl: './admin-board.html',
  styleUrl: './admin-board.css',
})
export class AdminBoard {
  private readonly userService = inject(UserService);
  protected roles: Role[] = [Role.MEMBER, Role.LIBRARIAN, Role.ADMIN];
  protected users = this.userService.allUsers;
  protected currentUser = this.userService.loggedUserSignal;
  protected successMessage = signal<string | null>(null);
  protected filteredUsers = computed(() =>
    this.users().filter((u) => u.userId !== this.currentUser()?.userId),
  );

  constructor() {
    this.userService.getUsers();
  }

  changeRole(user: User, newRole: Role): void {
    this.userService.updateUserRole(user.userId, newRole).subscribe({
      next: (updatedUser) => {
        this.userService.allUsers.update((users) =>
          users.map((u) => (u.userId === updatedUser.userId ? updatedUser : u)),
        );
        this.successMessage.set(
          `Le rôle de ${updatedUser.firstName} est maintenant ${updatedUser.role}`,
        );

        setTimeout(() => this.successMessage.set(null), 2500);
      },
      error: (err) => console.error('Erreur updating role', err),
    });
  }
}

