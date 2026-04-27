import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly http: HttpClient = inject(HttpClient)
  private readonly API_URL = 'http://localhost:8080/api/reservations'

  getUserReservations(id:string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.API_URL+'/user/'+id);
  }
}
