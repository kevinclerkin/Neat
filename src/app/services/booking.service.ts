import { Injectable } from '@angular/core';
import { Booking } from '../Booking';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  getBookings(): Observable<Booking[]>{
    const bookings = of([]);
    return bookings;
  }
}
