import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Booking';


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


