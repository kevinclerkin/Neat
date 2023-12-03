import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from 'src/app/Booking';


@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css']
})
export class BookingItemComponent implements OnInit {

  @Input() booking!: Booking;
  @Output() onDeleteBooking: EventEmitter<Booking> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Booking> = new EventEmitter();

 
  constructor(){}

  ngOnInit(): void {
    
  }

  onDelete(booking: Booking){
    this.onDeleteBooking.emit(booking);
  }

  
  onToggle(booking: Booking){

  }

}
