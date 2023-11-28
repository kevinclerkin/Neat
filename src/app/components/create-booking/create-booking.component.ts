import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import ValidateForm from '../../shared/Validation';
import { Availability } from 'src/app/Availability';
import { AvailabilityService } from 'src/app/services/availability.service';
import { User } from 'src/app/Models/User';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { Observable, of, switchMap, BehaviorSubject, tap } from 'rxjs';
import { A } from '@fullcalendar/core/internal-common';
import { ServiceOption } from 'src/app/Models/ServiceOption';
import { NeatService } from 'src/app/services/neat.service';
import { Booking } from 'src/app/Booking';
import { BookingService } from 'src/app/services/booking.service';
import { BookingsComponent } from '../bookings/bookings.component';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css'],
  providers: [MessageService]
})
export class CreateBookingComponent implements OnInit {
  @Output() onAddBooking: EventEmitter<Booking> = new EventEmitter();
  availabilityForm!: FormGroup;
  //availabilities$: Observable<Availability[]> = of([]);
  availabilities!: Availability[];
  //private availabilitiesSubject = new BehaviorSubject<Availability[]>([]);
  teamMembers!: User[];
  //selectedAvailabilityList: any[] = [];
  originalAvailabilities!: Availability[];
  isListFiltered: boolean = false;
  clientServices!: ServiceOption[];
  bookings!: Booking[];
  //id!: number;
  //booking!: Booking;
  

  constructor(
    private formBuilder: FormBuilder,
    private availabilityService: AvailabilityService,
    private teamMemberService: TeamMemberService,
    private neatService: NeatService,
    private bookingService: BookingService,
    private messageService: MessageService
  ){} //{this.availabilities$ = this.availabilitiesSubject.asObservable()}

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

    

    this.teamMemberService.getUsers().subscribe((teamMembers)=>{
      this.teamMembers = teamMembers;
    })

    /*this.availabilityForm.get('selectedTeamMember')?.valueChanges.subscribe((res: number)=>{
      console.log(res);
      this.availabilityForm.get('selectedAvailability')?.setValue(null);
      if(res){
        this.availabilities = this.availabilities.filter((obj: any)=> obj.userId === res);
        this.availabilityForm.get('selectedAvailability')?.enable();
      }else{
        this.availabilityForm.get('selectedAvailability')?.disable();
        
      }
    
    });*/

    this.availabilityForm.get('selectedTeamMember')?.valueChanges.subscribe((userId: number) => {
      console.log(userId);

      
      if (userId) {
        this.availabilities = this.originalAvailabilities.filter((obj: any) => obj.userId === userId);
        this.availabilityForm.get('selectedAvailability')?.enable();
      } else {
        this.availabilities = [...this.originalAvailabilities];
        this.availabilityForm.get('selectedAvailability')?.disable();
      }
    });

    //this.availabilities = [...this.originalAvailabilities]
    






    /*this.availabilityService.getAvailabilities().subscribe((availabilities) => {
      this.availabilitiesSubject.next(availabilities);
    });*/

    /*this.availabilityForm.get('selectedTeamMember')?.valueChanges.pipe(
      switchMap((userId)=> this.availabilityService.getAvailabilitiesByUserId(userId))
    ).subscribe((availabilities)=> {
      this.availabilities = of(availabilities);
    });*/

    /*this.availabilityForm.get('selectedTeamMember')?.valueChanges.pipe(
      switchMap((userId) => this.availabilityService.getAvailabilitiesByUserId(userId))
    ).subscribe((availabilities) => {
      this.availabilitiesSubject.next(availabilities);
    });*/
    
  }

  addBooking(): void{
    if(this.availabilityForm.valid){
      const selectedAvailabilityId: number = this.availabilityForm.get('selectedAvailability')?.value;
      const selectedAvailability: Availability | undefined = this.availabilities.find(availability => availability.availabilityId === selectedAvailabilityId);
      //const dateTime: string = selectedAvailability! ? selectedAvailability!.dateTime;

      const newBooking: Booking = {
        clientName: this.availabilityForm.get('clientName')?.value,
        clientEmail: this.availabilityForm.get('clientEmail')?.value,
        userId: this.availabilityForm.get('selectedTeamMember')?.value,
        serviceId: this.availabilityForm.get('selectedService')?.value,
        dateTime: selectedAvailability!.dateTime,
      }

      /*this.bookingService.addBooking(newBooking).pipe(
        tap(response => {
          console.log('Booking added', response);
          this.availabilityForm.reset();
        })
      ).subscribe();*/

    //this.bookingService.addBooking(newBooking).subscribe((newBooking) => (this.bookings.push(newBooking)))
    this.bookingService.addBooking(newBooking).subscribe();
    

} this.showSuccess(); }

showSuccess() {
  this.messageService.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Appointment booked successfully!'
  });
}

}