import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';
import { ReservationService } from '../../../../../shared/services/reservation-service';
import { Reservation } from '../../../../../shared/model/Reservation.model';
import { DatePipe, NgClass } from '@angular/common';
import { AvailabilityStatus } from '../../../../books/models/availabilityStatus.model';
import { Borrow } from '../../../../../shared/model/Borrow.model.ts';
import { BorrowService } from '../../../../../shared/services/borrow-service';

@Component({
  selector: 'app-user-profile',
  imports: [DatePipe, NgClass],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly userService: UserService = inject(UserService);
  private readonly reservationService: ReservationService = inject(ReservationService);
  private readonly borrowService: BorrowService = inject(BorrowService);

  protected user = this.userService.loggedUserSignal;
  protected userReservations = signal<Reservation[]>([]);
  protected userBorrows = signal<Borrow[]>([]);
  protected readonly AvailabilityStatus = AvailabilityStatus;

  constructor() {
    effect(() => {
      if (this.user()) {
        this.updateUserReservations();
        this.updateUserBorrows();
      }
    });
  }

  ngOnInit(): void {
    this.userService.updateLoggedUser(); // Juste ça, pas de logs
  }

  isLate(date: string | Date): boolean {
    const plannedDate = new Date(date);
    return plannedDate < new Date();
  }

  navigateToDetail(bookId: number) {
    this.router.navigate(['detail', bookId]);
  }

  updateUserReservations() {
    console.log('passage dans reservation' + this.user()?.firstName);
    if (this.user() !== null)
      this.reservationService.getUserReservations(this.user()!.userId.toString()).subscribe({
        next: (value) => this.userReservations.set(value),
      });
  }

  updateUserBorrows() {
    if (this.user() !== null) {
      this.borrowService.getUserBorrows(this.user()!.userId.toString()).subscribe({
        next: (value) => this.userBorrows.set(value),
      });
    }
  }

  cancelReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe({
      complete: () => this.updateUserReservations(),
    });
  }
}
