import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { BookService } from '../../core/services/book';
import { Book } from '../../core/models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  private bookService = inject(BookService);

  books: Book[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('OK', data);
        this.books = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les livres.';
        this.loading = false;
      }
    });
  }
}
