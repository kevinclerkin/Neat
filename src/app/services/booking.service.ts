import { Injectable } from '@angular/core';
import { Booking } from '../Booking';
import { Observable, from, of } from 'rxjs';
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

  addBooking(booking: Booking): Observable<Booking>{
    return this.http.post<Booking>(this.apiUrl, booking, httpOptions);

  }
}
