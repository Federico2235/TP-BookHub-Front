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
import { BorrowCreate } from '../../../../shared/model/BorrowCreate.model';

@Component({
  selector: 'app-librarian-board',
  imports: [DatePipe],
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
  borrows = this.borrowService.allBorrows.asReadonly();

  areReservationsDisplayed = signal<boolean>(false);
  reservations = this.reservationService.allReservations.asReadonly();
  reservationsFiltered: Signal<Reservation[]> = computed(() =>
    this.reservationService
      .allReservations()
      .reverse()
      .slice(this.resaStartVal(), this.resaEndVal()),
  );

  areBorrowsDisplayed = signal<boolean>(false);
  borrowsFiltered = computed(() =>
    this.borrowService.allBorrows().reverse().slice(this.borrowsStartVal(), this.borrowsEndVal()),
  );

  currentBorrows = computed(() => this.borrows().filter((borrow) => borrow.returnDate === null));
  overdueLoans = computed(() => this.borrows().filter((borrow) => borrow.returnDate === null && this.isLate(borrow.borrowEnd)));

  ngOnInit(): void {
    this.borrowService.updateBorrows();
    this.bookService.updateBooks();
    this.reservationService.updateReservations();
  }

  isLate(date: Date) {
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

  convertToBorrow(reservation: Reservation) {
    if (reservation.user.userId) {
      const today: Date = new Date();
      const borrowEndDate: Date = new Date(new Date().setDate(new Date().getDate() + 13));
      const borrow: BorrowCreate = {
        userId: reservation.user.userId,
        bookId: reservation.book.id,
        borrowStart: today,
        borrowEnd: borrowEndDate,
      };
      console.log('start:' + today);
      console.log('end: ' + borrowEndDate);

      this.borrowService.convertReservationToBorrow(borrow).subscribe({
        complete: () => {
          this.borrowService.updateBorrows();
          this.reservationService.updateReservations();
        },
      });
    }
  }
}
