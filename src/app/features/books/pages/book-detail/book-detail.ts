import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AvailabilityStatus } from '../../models/availabilityStatus.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly bookService: BooksService = inject(BooksService);

  private readonly bookId = this.route.snapshot.paramMap.get('id');
  private readonly _book = this.bookService.getBookById(this.bookId!);

  bookSignal = toSignal(this._book);
  protected readonly AvailabilityStatus = AvailabilityStatus;

  public isBookBorrowable(book: Book): boolean {
    return book.status === AvailabilityStatus.AVAILABLE ? true : false
  }

  protected onClickReserve() {
    console.log('coucou touaaaaaaaa');
  }
}
