import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    private router: Router){}
    
    ngOnInit(): void {
      this.availabilityForm = this.formBuilder.group({
        selectedTeamMember: new FormControl({value: null, disabled: false}, [Validators.required]),
        selectedAvailability: new FormControl({value: null, disabled: true}, [Validators.required]),
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

      this.availabilityForm.get('selectedTeamMember')?.valueChanges.subscribe((userId: number) =>{
        if (userId) {
          this.availabilities = this.originalAvailabilities.filter((obj:any) => obj.teamMemberId === userId);
          this.availabilityForm.get('selectedAvailability')?.enable();
        } else {
          this.availabilities = [...this.originalAvailabilities];
          this.availabilityForm.get('selectedAvailability')?.disable();
        }});
  


  
    }

    addBooking(): void{
      if(this.availabilityForm.valid){
        const selectedAvailabilityId: number = this.availabilityForm.get('selectedAvailability')?.value;
        const selectedAvailability: Availability | undefined = this.availabilities.find(availability => availability.availabilityId === selectedAvailabilityId);
        //const dateTime: string = selectedAvailability! ? selectedAvailability!.dateTime;
  
        const newBooking: Booking = {
          clientName: this.availabilityForm.get('clientName')?.value,
          clientEmail: this.availabilityForm.get('clientEmail')?.value,
          teamMemberId: this.availabilityForm.get('selectedTeamMember')?.value,
          serviceId: this.availabilityForm.get('selectedService')?.value,
          dateTime: selectedAvailability!.dateTime,
        }
  
        
      this.bookingService.addBooking(newBooking).subscribe();
      this.onAddBooking.emit(newBooking)
      this.router.navigate(['confirm']);

      }   
  
  } 
  
}
