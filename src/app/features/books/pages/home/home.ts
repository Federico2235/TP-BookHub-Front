import { Component, computed, inject, signal } from '@angular/core';
import { BooksService } from '../../services/books-service';
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
  books = this.bookService.allBooks;
  searchBarInput = signal<string>('');
  availabilityCheckBox = signal<boolean>(false);
  availabilityForm = form<boolean>(this.availabilityCheckBox);
  searchBarForm = form(this.searchBarInput);
  availableFilteredBooks = computed(() => this.books().filter((book) => !book.reserved));
  filteredBooks = computed(() => {
    if (this.availabilityForm().value()) {
      return this.availableFilteredBooks().filter((book) =>
        book.title.toLowerCase().includes(this.searchBarForm().value().toLowerCase()),
      );
    } else {
      return this.books().filter((book) =>
        book.title.toLowerCase().includes(this.searchBarForm().value().toLowerCase()),
      );
    }
  });
  protected readonly AvailabilityStatus = AvailabilityStatus;

  constructor() {
    this.bookService.updateBooks()
  }
}
