import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../interfaces/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingDataService {
  private capturedBookingSubject = new BehaviorSubject<Booking | null>(null);
  capturedBooking$ = this.capturedBookingSubject.asObservable();

  setCapturedBooking(booking: Booking): void {
    this.capturedBookingSubject.next(booking);
  }
}