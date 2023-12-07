import { Component, OnInit, HostListener} from '@angular/core';
import { Booking } from '../../interfaces/booking';
import { BookingDataService } from '../../services/booking-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-pay',
  templateUrl: './confirm-pay.component.html',
  styleUrls: ['./confirm-pay.component.css']
})
export class ConfirmPayComponent implements OnInit{
  capturedEventData!: Booking | null;

  constructor(private bookingDataService: BookingDataService, private router: Router){
    this.capturedEventData = null;
  }

  ngOnInit(): void {
    this.bookingDataService.capturedBooking$.subscribe((booking) => {
      this.capturedEventData = booking;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event): void {
    this.router.navigate(['/home']);
  }

}