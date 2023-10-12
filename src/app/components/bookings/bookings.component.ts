import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Booking';
import { BookingService } from 'src/app/services/booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

 bookings: Booking[] = []

 ngOnInit(): void {
   
 }

 addBooking(booking: Booking){}

 deleteBooking(booking: Booking){}

}


