import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Booking';
import { BookingService } from 'src/app/services/booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

 bookings: Booking[] = [];

 constructor(private bookingService: BookingService){}

 ngOnInit(): void {
   this.bookingService.getBookings().subscribe((bookings) => (this.bookings = bookings));
 }

 addBooking(booking: Booking){
  this.bookingService.addBooking(booking).subscribe((booking) => (this.bookings.push(booking)));
 }

 deleteBooking(booking: Booking){}

}


