import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AvailabilityStatus } from '../../models/availabilityStatus.model';
import { Book } from '../../models/book.model';
import { ReservationService } from '../../../../shared/services/reservation-service';
import { UserService } from '../../../users/services/user-service';
import { LoginRequest } from '../../../users/models/loginRequest.model';
import { ReservationRequest } from '../../../../shared/model/ReservationRequest.model';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly bookService: BooksService = inject(BooksService);
  private readonly reservationService = inject(ReservationService);
  private readonly userService = inject(UserService);

  private readonly bookId = this.route.snapshot.paramMap.get('id');
  private readonly _book = this.bookService.getBookById(this.bookId!);
  private readonly userId: string | null = this.route.snapshot.paramMap.get('id');


  bookSignal = toSignal(this._book);
  protected readonly AvailabilityStatus = AvailabilityStatus;

  public isBookBorrowable(book: Book): boolean {
    return book.status === AvailabilityStatus.AVAILABLE ? true : false;
  }

  protected onClickReserve(): void {
    const user = this.userId
    const bookId = Number(this.bookId);

    console.log('user:', user);
    console.log('user.id:', this.userId);
    console.log('bookId (raw):', this.bookId);
    console.log('bookId (number):', Number(this.bookId));
    if (!user || !this.userId|| !bookId) {
      console.error('No se puede reservar: falta userId o bookId');
      return;
    }

    const reservationRequest: ReservationRequest = {
      userId: Number(this.userId),
      bookId: bookId,
    };

    this.reservationService.reserveABook(reservationRequest).subscribe({
      next: (reservation) => {
        console.log('Livre reservé:', reservation);
      },
      error: (error) => {
        console.error('Erreur dans la reservation:', error);
      },
    });
  }
}
