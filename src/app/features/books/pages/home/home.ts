import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvailabilityStatus } from '../../models/availabilityStatus.model';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private bookService = inject(BooksService);

  _books = this.bookService.getBooks();
  protected readonly AvailabilityStatus = AvailabilityStatus;
}
