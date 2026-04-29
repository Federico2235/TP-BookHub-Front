import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { ReservationService } from '../../../../shared/services/reservation-service';
import { BooksService } from '../../../books/services/books-service';
import { BorrowService } from '../../../../shared/services/borrow-service';
import { DatePipe } from '@angular/common';
import { BookCondition } from '../../../books/models/bookCondition.model';
import { AvailabilityStatus } from '../../../books/models/availabilityStatus.model';
import { Reservation } from '../../../../shared/model/Reservation.model';
import { BorrowCreate } from '../../../../shared/model/BorrowCreate.model';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-librarian-board',
  imports: [DatePipe, FormField],
  templateUrl: './librarian-board.html',
  styleUrl: './librarian-board.css',
})
export class LibrarianBoard {
  //Dependencies
  private userService: UserService = inject(UserService);
  private reservationService: ReservationService = inject(ReservationService);
  private bookService: BooksService = inject(BooksService);
  private borrowService: BorrowService = inject(BorrowService);

  //Enums
  protected readonly BookCondition = BookCondition;
  protected readonly AvailabilityStatus = AvailabilityStatus;

  //Forms
  searchReservationInput = signal<string>('');
  searchBorrowsInput = signal<string>('');
  searchBookInput = signal<string>('');
  searchReservationForm = form<string>(this.searchReservationInput);
  searchBorrowsForm = form<string>(this.searchBorrowsInput);
  searchBookForm = form<string>(this.searchBookInput);

  //Data as Signals
  user: WritableSignal<User | null> = this.userService.loggedUserSignal;
  books = this.bookService.allBooks.asReadonly();
  borrows = this.borrowService.allBorrows.asReadonly();
  reservations = this.reservationService.allReservations.asReadonly();

  //Computed values as Signals
  currentBorrows = computed(() =>
    this.borrows()
      .filter((borrow) => borrow.returnDate === null)
  );
  overdueLoans = computed(() =>
    this.borrows().filter((borrow) => borrow.returnDate === null && this.isLate(borrow.borrowEnd)),
  );
  reservationsFiltered = computed(() =>
    this.reservations().filter(resa => resa.book.title.toLowerCase().includes(this.searchReservationForm().value().toLowerCase()))
  );
  currentBorrowsFiltered = computed(() =>
    this.currentBorrows().filter(borrow => borrow.book.title.toLowerCase().includes(this.searchBorrowsForm().value().toLowerCase()))
  );
  booksFiltered = computed(() =>
    this.books().filter(book => book.title.toLowerCase().includes(this.searchBookForm().value().toLowerCase()))
  )


  constructor() {
    this.updateAll();
  }

  isLate(date: Date) {
    return this.borrowService.isLate(date);
  }

  updateAll() {
    this.borrowService.updateBorrows();
    this.bookService.updateBooks();
    this.reservationService.updateReservations();
  }

  calculateDelay(returnDate: Date): number {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const bookReturnDate = new Date(returnDate);
    bookReturnDate.setHours(0, 0, 0, 0);

    const diffMs = today.getTime() - bookReturnDate.getTime();

    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
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
      this.borrowService.convertReservationToBorrow(borrow).subscribe({
        complete: () => this.updateAll(),
      });
    }
  }

  returnBorrow(id: number) {
    this.borrowService.returnBorrow(id).subscribe({
      complete: () => this.updateAll(),
    });
  }
}
