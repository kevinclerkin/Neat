import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Booking } from 'src/app/Booking';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  @Output() onAddBooking: EventEmitter<Booking> = new EventEmitter();
  
  service!: string;
  available!: string;
  dateTime!: string;
  clientName!: string;
  clientEmail!: string;
  showAddBooking: boolean = false;
  subscription!: Subscription;

  constructor(){}
  
  


  ngOnInit(): void {
    
  }

  onSubmit(){
    if(!this.service){
      alert('Make a booking!');
      return;
    }

    const newBooking = {
      service: this.service,
      available: this.available,
      dateTime: this.dateTime,
      clientName: this.clientName,
      clientEmail: this.clientEmail
      

    };

    this.onAddBooking.emit(newBooking);

    this.service = '';
    this.available = '';
    this.dateTime = '';
    this.clientName = '';
    this.clientEmail = '';
  }


}
