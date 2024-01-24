import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Availability } from '../../interfaces/availability';
import { AvailabilityService } from '../../services/availability.service';
import { TeamMemberService } from '../../services/team-member.service';
import { ServiceOption } from '../../models/service-option';
import { NeatService } from '../../services/neat-service.service';
import { Booking } from '../../interfaces/booking';
import { BookingService } from '../../services/booking.service';
import { TeamMember } from '../../models/team-member';
import { Router } from '@angular/router';
import { BookingDataService } from '../../services/booking-data.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent implements OnInit {
  @Output() onAddBooking: EventEmitter<Booking> = new EventEmitter();
  
  availabilityForm!: FormGroup;
  availabilities!: Availability[];

  teamMembers!: TeamMember[];

  originalAvailabilities!: Availability[];
  isListFiltered: boolean = false;
  clientServices!: ServiceOption[];
  bookings!: Booking[];
 

  constructor(
    private formBuilder: FormBuilder,
    private availabilityService: AvailabilityService,
    private teamMemberService: TeamMemberService,
    private neatService: NeatService,
    private bookingService: BookingService,
    private router: Router,
    private bookingDataService: BookingDataService){}
    
    ngOnInit(): void {
      this.availabilityForm = this.formBuilder.group({
        selectedTeamMember: new FormControl({value: null, disabled: false}, [Validators.required]),
        selectedAvailability: new FormControl({value: null, disabled: false}, [Validators.required]),
        selectedService: new FormControl(null, [Validators.required]),
        clientName: new FormControl(null, [Validators.required]),
        clientEmail: new FormControl(null, [Validators.required, Validators.email])
       
      });

      this.neatService.getServices().subscribe((clientServices)=> {
        this.clientServices = clientServices;
      })
  
      this.availabilityService.getAvailabilities().subscribe((availabilities)=> {
        this.availabilities = availabilities;
        this.originalAvailabilities = [...availabilities];
      });
  
      
  
      this.teamMemberService.getTeamMembers().subscribe((teamMembers)=>{
        this.teamMembers = teamMembers;
      });

      /*this.availabilityForm.get('selectedTeamMember')?.valueChanges.subscribe((userId: number) =>{
        if (userId){
          this.availabilities = this.originalAvailabilities.filter((obj:any) => obj.teamMemberId === userId);
          
          //this.availabilityForm.get('selectedAvailability')?.enable();
        } else {
          this.availabilities = [...this.originalAvailabilities];
          this.availabilityForm.get('selectedAvailability')?.disable();
        }});*/
       
      

        //const selectedAvailabilityId: number = this.availabilityForm.get('selectedAvailability')?.value;
        //console.log('Selected availability ID: ' + selectedAvailabilityId);
        //const selectedAvailability: Availability| undefined  = this.availabilities.find(availability => availability.availabilityId === selectedAvailabilityId);

        //if(selectedAvailability) {
          //this.availabilityForm.get('selectedAvailability')?.setValue(selectedAvailability.dateTime);
       //}
  


  

    }


    addBooking(): void {
      console.log('Form Value:', this.availabilityForm.value);
      const selectedAvailability: any = this.availabilityForm.get('selectedAvailability')?.value;
      console.log('Selected Availability:', selectedAvailability);
      //const selectedAvailability: Availability | any = this.availabilities.find(availability => availability.availabilityId === selectedAvailabilityId);

    
      
      if (this.availabilityForm.valid) {
        const newBooking: Booking = {
          clientName: this.availabilityForm.get('clientName')?.value,
          clientEmail: this.availabilityForm.get('clientEmail')?.value,
          teamMemberId: this.availabilityForm.get('selectedTeamMember')?.value,
          serviceId: this.availabilityForm.get('selectedService')?.value,
          dateTime: selectedAvailability.dateTime,
        };
    
        this.bookingService.addBooking(newBooking).subscribe(() => {
          console.log('Booking added successfully');
          this.bookingDataService.setCapturedBooking(newBooking);
          this.router.navigate(['/confirm-pay']);
          this.availabilityService.deleteAvailability(selectedAvailability.availabilityId).subscribe(() => {
            console.log('Availability deleted successfully');
          });
        });
      } else {
        console.error('Selected availability is undefined.');
      }
    }







    //selectedAvailabilityId: number | undefined = this.availabilityForm.get('selectedAvailability')?.value;
    //selectedAvailability: Availability | undefined = this.availabilities.find(availability => availability.availabilityId === this.selectedAvailabilityId);


    
    /*addBooking(): void {
      const selectedAvailabilityId: number = this.availabilityForm.get('selectedAvailability')?.value;
      const selectedAvailability: Availability | any = this.availabilities.find(availability => availability.availabilityId === this.selectedAvailabilityId);
      const newBooking: Booking = {
        clientName: this.availabilityForm.get('clientName')?.value,
        clientEmail: this.availabilityForm.get('clientEmail')?.value,
        teamMemberId: this.availabilityForm.get('selectedTeamMember')?.value,
        serviceId: this.availabilityForm.get('selectedService')?.value,
        dateTime: selectedAvailability.dateTime,
    }
    console.log('New Booking: ', newBooking);
  
    this.bookingService.addBooking(newBooking).subscribe(() => {
      console.log('Booking added successfully');
      this.bookingDataService.setCapturedBooking(newBooking);
      this.router.navigate(['/confirm-pay']);
      this.availabilityService.deleteAvailability(selectedAvailabilityId).subscribe(() => {
        console.log('Availability deleted successfully');
      });
      
    });
  }*/
  



    


    /*addBooking(): void {
      console.log('Submit button clicked');
      if (this.availabilityForm.valid) {
        console.log('Form is valid');
        const selectedAvailabilityId: number = this.availabilityForm.get('selectedAvailability')?.value;
        console.log('Selected availability ID: ' + selectedAvailabilityId);
        const selectedAvailability: Availability | undefined = this.availabilities.find(availability => availability.availabilityId === selectedAvailabilityId);
        console.log('Selected availability: ' + JSON.stringify(selectedAvailability));
        
        console.log('Form status:', this.availabilityForm.status);
    
        
        if (selectedAvailability) {
          console.log('Selected availability is defined');
          const newBooking: Booking = {
            clientName: this.availabilityForm.get('clientName')?.value,
            clientEmail: this.availabilityForm.get('clientEmail')?.value,
            teamMemberId: this.availabilityForm.get('selectedTeamMember')?.value,
            serviceId: this.availabilityForm.get('selectedService')?.value,
            dateTime: selectedAvailability.dateTime,
          };
    
          this.bookingService.addBooking(newBooking).subscribe(() => {
            console.log('Booking added successfully');
            this.bookingDataService.setCapturedBooking(newBooking);
            this.router.navigate(['/confirm-pay']);
            this.availabilityService.deleteAvailability(selectedAvailabilityId).subscribe(() => {
              console.log('Availability deleted successfully');
            });
          });
        } else {
          console.error('Selected availability is undefined.');
        }
        
        
      }
      else {
        console.log('Form is invalid');
      }
    }*/
  
}
