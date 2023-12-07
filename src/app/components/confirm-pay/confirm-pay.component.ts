/*import { Component, OnDestroy } from '@angular/core';
import { Booking } from '../../interfaces/booking';
import {Subscription} from 'rxjs';
import { CreateBookingComponent } from '../create-booking/create-booking.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirm-pay',
  templateUrl: './confirm-pay.component.html',
  styleUrl: './confirm-pay.component.css'
})
export class ConfirmPayComponent implements OnDestroy {
  private subscription: Subscription;
  private router!: Router;

  constructor(private createBookingComponent: CreateBookingComponent) {
    
    this.subscription = this.createBookingComponent.onAddBooking.subscribe((newBooking: Booking) => {
      
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.router.navigate(['/home']);
  }
}
 
*/


