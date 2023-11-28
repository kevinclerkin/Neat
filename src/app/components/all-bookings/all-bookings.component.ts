import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Booking';
import { BookingService } from 'src/app/services/booking.service'
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

 bookings: Booking[] = [];

 constructor(private bookingService: BookingService){}
 



  ngOnInit(): void {
    this.bookingService.getBookings().subscribe((bookings) => (this.bookings = bookings));
  }
}


