import { Component, inject, Signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReservationService } from '../../../../../shared/services/reservation-service';
import { Reservation } from '../../../../../shared/model/Reservation.model';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { AvailabilityStatus } from '../../../../books/models/availabilityStatus.model';
import { Borrow } from '../../../../../shared/model/Borrow.model.ts';
import { BorrowService } from '../../../../../shared/services/borrow-service';

@Component({
  selector: 'app-user-profile',
  imports: [DatePipe, JsonPipe, NgClass],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  isLate(date: string | Date): boolean {
    const plannedDate = new Date(date);
    return plannedDate < new Date();
  }
  private readonly router: Router = inject(Router);
  private readonly userService: UserService = inject(UserService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly reservationService: ReservationService = inject(ReservationService);
  private readonly borrowService: BorrowService = inject(BorrowService);
  private readonly userId: string | null = this.route.snapshot.paramMap.get('id');
  protected user: Signal<User | undefined> = toSignal(this.userService.fetchUserById(this.userId!));
  protected userReservations: Signal<Reservation[] | undefined> = toSignal(
    this.reservationService.getUserReservations(this.userId!),
  );
  protected userBorrows: Signal<Borrow[] | undefined> = toSignal(
    this.borrowService.getUserBorrows(this.userId!),
  );
  protected readonly AvailabilityStatus = AvailabilityStatus;

  navigateToDetail(bookId: number) {
    this.router.navigate(['detail', bookId]);
  }


}
