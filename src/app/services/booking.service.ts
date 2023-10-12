import { Injectable } from '@angular/core';
import { Booking } from '../Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  getBookings(): Booking[]{
    return [];
  }
}
