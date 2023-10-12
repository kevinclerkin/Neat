import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Booking } from 'src/app/Booking';

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
  clientEmail!: string;
  clientName!: string;
  showAddBooking: boolean = true;
  
  


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
      clientEmail: this.clientEmail,
      clientName: this.clientName,
      dateTime: this.dateTime

    };

    this.onAddBooking.emit(newBooking);

    this.service = '';
    this.available = '';
    this.dateTime = '';
    this.clientEmail = '';
    this.clientName = '';
  }


}
