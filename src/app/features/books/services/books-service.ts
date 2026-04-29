import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/books';
  allBooks: WritableSignal<Book[]> = signal<Book[]>([])

  getBooks(): Observable<Book[]> {
    const result = this.http.get<Book[]>(this.apiUrl);
    result.subscribe({next: (books) => this.allBooks.set(books)})
    console.log(result.subscribe())
    return result ;
  }

  getBookById(id:string) {
    return this.http.get<Book>(this.apiUrl+`/${id}`);
  }

  updateBooks(){
    this.getBooks()
  }
}
