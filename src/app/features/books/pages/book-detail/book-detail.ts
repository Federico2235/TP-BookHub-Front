import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books-service';
import { AvailabilityStatus } from '../../models/availabilityStatus.model';
import { Book } from '../../models/book.model';
import { ReservationService } from '../../../../shared/services/reservation-service';
import { UserService } from '../../../users/services/user-service';
import { ReservationRequest } from '../../../../shared/model/ReservationRequest.model';
import { Borrow } from '../../../../shared/model/Borrow.model.ts';
import { BorrowService } from '../../../../shared/services/borrow-service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-book-detail',
  imports: [DatePipe],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookService = inject(BooksService);
  private readonly reservationService = inject(ReservationService);
  private readonly userService = inject(UserService);
  private readonly borrowService = inject(BorrowService);

  private readonly bookId = this.route.snapshot.paramMap.get('id');
  private readonly loggedUserSignal = this.userService.loggedUserSignal;

  protected readonly AvailabilityStatus = AvailabilityStatus;
  borrowSignal = signal<Borrow | undefined>(undefined);
  bookSignal = signal<Book | undefined>(undefined);
  userReservationsCount = signal<number | null>(null);

  constructor() {
    this.loadBook();
    this.loadUserReservationsCount();
    setTimeout(() => {
      this.loadUserReservationsCount();
    }, 500);
  }

  private loadBookBorrow(bookId: number): void {
    this.borrowService.getBookBorrow(bookId).subscribe({
      next: (borrow) => this.borrowSignal.set(borrow),
      error: (error) => console.error('Erreur chargement emprunt:', error),
    });
  }

  private loadBook(): void {
    if (!this.bookId) return;

    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.bookSignal.set(book);

        if (book.status === AvailabilityStatus.BORROWED || book.reserved) {
          this.loadBookBorrow(book.id);
        }
      },
      error: (error) => console.error('Erreur chargement livre:', error),
    });
  }

  private loadUserReservationsCount(): void {
    const user = this.loggedUserSignal();

    if (!user) {
      return;
    }

    this.reservationService.getUserReservations(String(user.userId)).subscribe({
      next: (reservations) => {
        this.userReservationsCount.set(reservations.length);
      },
      error: (error) => {
        console.error('Erreur chargement réservations utilisateur:', error);
      },
    });
  }

  public isLoggedIn(): boolean {
    return !!this.loggedUserSignal();
  }

  public reservationsCountLoaded(): boolean {
    return this.userReservationsCount() !== null;
  }

  public userReachedReservationLimit(): boolean {
    const count = this.userReservationsCount();
    return count !== null && count >= 5;
  }

  public userCanReserve(): boolean {
    const user = this.loggedUserSignal();
    const count = this.userReservationsCount();

    if (!user) return true;
    if (count === null) return false;

    return count < 5;
  }

  public canShowReserveButton(book: Book): boolean {
    return this.userCanReserve() && !this.isBookReserved(book);
  }

  public isBookAvailable(book: Book): boolean {
    return book.status === AvailabilityStatus.AVAILABLE;
  }

  public isBookReserved(book: Book): boolean {
    return book.reserved;
  }

  protected onClickReserve(): void {
    const user = this.loggedUserSignal();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const bookId = Number(this.bookId);

    if (!bookId || this.userReachedReservationLimit()) {
      return;
    }

    const reservationRequest: ReservationRequest = {
      userId: user.userId,
      bookId,
    };

    this.reservationService.reserveABook(reservationRequest).subscribe({
      next: () => {
        this.loadBook();
        this.loadUserReservationsCount();
      },
      error: (error) => {
        console.error('Erreur dans la reservation:', error);
      },
    });
  }
}
