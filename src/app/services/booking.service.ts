import { Injectable } from '@angular/core';
import { Booking } from '../Booking';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })

}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7193/api/Neat';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiUrl);
  }

  getBookingByClientEmail(booking: Booking): Observable<Booking>{
    const url = `${this.apiUrl}/${booking.clientEmail}`;
    return this.http.get<Booking>(url);
  }

  addBooking(booking: Booking): Observable<Booking>{
    return this.http.post<Booking>(this.apiUrl, booking, httpOptions);

  }

  deleteBooking(booking: Booking): Observable<Booking>{
    const url = `${this.apiUrl}/${booking.id}`;
    return this.http.delete<Booking>(url);
  }
}
