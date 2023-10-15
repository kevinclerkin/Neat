import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/Booking';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css']
})
export class BookingItemComponent implements OnInit {

  @Input() booking!: Booking;

  faTimes = faTimes;
  
  constructor(){}

  ngOnInit(): void {
    
  }

  onDelete(booking: Booking){}

  onToggle(booking: Booking){}

}
