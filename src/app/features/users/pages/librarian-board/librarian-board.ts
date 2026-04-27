import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { ReservationService } from '../../../../shared/services/reservation-service';
import { BooksService } from '../../../books/services/books-service';
import { BorrowService } from '../../../../shared/services/borrow-service';
import { DatePipe, JsonPipe } from '@angular/common';
import { BookCondition } from '../../../books/models/bookCondition.model';
import { AvailabilityStatus } from '../../../books/models/availabilityStatus.model';
import { Reservation } from '../../../../shared/model/Reservation.model';

@Component({
  selector: 'app-librarian-board',
  imports: [DatePipe, JsonPipe],
  templateUrl: './librarian-board.html',
  styleUrl: './librarian-board.css',
})
export class LibrarianBoard implements OnInit {
  private userService: UserService = inject(UserService);
  private reservationService: ReservationService = inject(ReservationService);
  private bookService: BooksService = inject(BooksService);
  private borrowService: BorrowService = inject(BorrowService);

  protected readonly BookCondition = BookCondition;
  protected readonly AvailabilityStatus = AvailabilityStatus;

  private readonly borrowsStartVal: WritableSignal<number | undefined> = signal(0);
  private readonly borrowsEndVal: WritableSignal<number | undefined> = signal(5);
  private readonly resaStartVal: WritableSignal<number | undefined> = signal(0);
  private readonly resaEndVal: WritableSignal<number | undefined> = signal(4);

  user: WritableSignal<User | null> = this.userService.loggedUserSignal;
  books = this.bookService.allBooks.asReadonly();

  areReservationsDisplayed = signal<boolean>(false);
  reservations = this.reservationService.allReservations.asReadonly();
  reservationsFiltered: Signal<Reservation[]> = computed(() =>
    this.reservationService.allReservations().slice(this.resaStartVal(), this.resaEndVal()),
  );

  areBorrowsDisplayed = signal<boolean>(false);
  borrows = this.borrowService.allBorrows.asReadonly();
  borrowsFiltered = computed(() =>
    this.borrowService.allBorrows().slice(this.borrowsStartVal(), this.borrowsEndVal()),
  );

  overdueLoans = computed(() => this.borrows()?.filter((borrow) => borrow.returnDate < new Date()));

  ngOnInit(): void {
    this.borrowService.updateBorrows();
    this.bookService.updateBooks();
    this.reservationService.updateReservations();
  }

  isLate(date: string) {
    return this.borrowService.isLate(date);
  }

  calculateDelay(returnDate: Date): number {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const bookReturnDate = new Date(returnDate);
    bookReturnDate.setHours(0, 0, 0, 0);

    const diffMs = today.getTime() - bookReturnDate.getTime();

    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  protected viewAllBorrows() {
    if (!this.areBorrowsDisplayed()) {
      this.borrowsStartVal.set(undefined);
      this.borrowsEndVal.set(undefined);
      this.areBorrowsDisplayed.set(true);
    } else {
      this.areBorrowsDisplayed.set(false);
      this.borrowsStartVal.set(0);
      this.borrowsEndVal.set(5);
    }
  }

  protected viewAllReservations() {
    if (!this.areReservationsDisplayed()) {
      this.resaStartVal.set(undefined);
      this.resaEndVal.set(undefined);
      this.areReservationsDisplayed.set(true);
    } else {
      this.areReservationsDisplayed.set(false);
      this.resaStartVal.set(0);
      this.resaEndVal.set(4);
    }
  }
}
