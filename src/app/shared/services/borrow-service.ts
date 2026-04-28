import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation.model';
import { Borrow } from '../model/Borrow.model.ts';

@Injectable({
  providedIn: 'root',
})
export class BorrowService {
  private readonly http: HttpClient = inject(HttpClient)
  private readonly API_URL = 'http://localhost:8080/api/borrows'

  getUserBorrows(id:string): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(this.API_URL+'/user/'+id);
  }
}
