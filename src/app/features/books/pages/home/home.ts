import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { Book } from '../../models/book.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private bookService = inject(BooksService);

  books: Book[] = [];
  _books = this.bookService.getBooks();

}
