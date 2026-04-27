import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation.model';
import { ReservationRequest } from '../model/ReservationRequest.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/reservations';
  allReservations: WritableSignal<Reservation[]> = signal<Reservation[]>([]);

  getAllReservations(): Observable<Reservation[]> {
    const result = this.http.get<Reservation[]>(this.API_URL);
    result.subscribe({next: (reservations) => this.allReservations.set(reservations)})
    return result ;
  }

  getUserReservations(id: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.API_URL + '/user/' + id);
  }

  updateReservations(){
    this.getAllReservations()
  }

  reserveABook(reservation : ReservationRequest):Observable<Reservation>{
    return this.http.post<Reservation>(this.API_URL,reservation)
  }
}
