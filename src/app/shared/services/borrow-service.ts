import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrow } from '../model/Borrow.model.ts';
import { BorrowCreate } from '../model/BorrowCreate.model';

@Injectable({
  providedIn: 'root',
})
export class BorrowService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/borrows';
  allBorrows: WritableSignal<Borrow[]> = signal<Borrow[]>([]);

  getAllBorrows() {
    const result = this.http.get<Borrow[]>(this.API_URL);
    result.subscribe({
      next: (borrows) => this.allBorrows.set(borrows),
    });
    return result;
  }

  getUserBorrows(id: string): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(this.API_URL + '/user/' + id);
  }

  isLate(date: string | Date): boolean {
    const d = new Date(date);
    const today = new Date();
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return d < today;
  }

  updateBorrows() {
    this.getAllBorrows();
  }

  convertReservationToBorrow(borrowCreate: BorrowCreate) {
    console.log('borrowCreate: ' + borrowCreate);
    return this.http.post<BorrowCreate>(this.API_URL, borrowCreate);
  }

  returnBorrow(id:number){
    return this.http.patch<Borrow>(this.API_URL+'/'+id+'/return-date', {returnDate: new Date()})
  }
}
