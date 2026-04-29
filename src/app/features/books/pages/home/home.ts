import { Component, computed, inject, signal } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvailabilityStatus } from '../../models/availabilityStatus.model';
import { form, FormField } from '@angular/forms/signals';
import { NoResultFound } from '../no-result-found/no-result-found';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormField, NoResultFound],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private bookService = inject(BooksService);
  constructor() {
    console.log('Home created');
  }
  books = this.bookService.allBooks;
  _books = this.bookService.getBooks();
  searchBarInput = signal<string>('');
  searchBarForm = form(this.searchBarInput);
  filteredBooks = computed(() =>
    this.books().filter((book) =>
      book.title.toLowerCase().includes(this.searchBarForm().value().toLowerCase()),
    ),
  );
  protected readonly AvailabilityStatus = AvailabilityStatus;
}
