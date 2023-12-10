import { Component, OnInit } from '@angular/core';
import { Booking } from '../../interfaces/booking';
import { BookingService } from '../../services/booking.service';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
bookings!: Booking[];

get bookingsPairs(): Booking[][] {
  const pairs = [];
  for (let i = 0; i < this.bookings.length; i += 2) {
    const pair = [this.bookings[i], this.bookings[i + 1]];
    pairs.push(pair);
  }
  return pairs;
}

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe((bookings)=> {
      this.bookings = bookings;
    });
  }

}
