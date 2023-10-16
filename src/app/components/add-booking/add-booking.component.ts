import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Booking } from 'src/app/Booking';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  @Output() onAddBooking: EventEmitter<Booking> = new EventEmitter();
  
  selectedService: string = '';
  available: string = '';
  dateTime!: string;
  clientName!: string;
  clientEmail!: string;
  showAddBooking: boolean = false;
  subscription!: Subscription;

  services: string[] = ["Dry Cut", "Wash, Cut & Style", "Hot Towel Shave", "Beard Trim"];
  teamMembers: string[] = ["Alan", "John", "Rob"];

  

  constructor(private uiService:UiService){
    this.subscription = this.uiService.onToggle().subscribe((value:any) => (this.showAddBooking = value));
    
  }
  
  


  ngOnInit(): void {
    
  }

  onSubmit(){
    if(!this.selectedService || !this.available || !this.dateTime || !this.clientName || !this.clientEmail){
      alert('Complete all fields to make a booking!');
      return;
    }

    const newBooking = {
      service: this.selectedService,
      available: this.available,
      dateTime: this.dateTime,
      clientName: this.clientName,
      clientEmail: this.clientEmail
      

    };

    this.onAddBooking.emit(newBooking);

    this.selectedService = '';
    this.available = '';
    this.dateTime = '';
    this.clientName = '';
    this.clientEmail = '';
  }


}
