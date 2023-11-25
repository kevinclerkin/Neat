import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Availability } from 'src/app/Availability';
import { AvailabilityService } from 'src/app/services/availability.service';
import { User } from 'src/app/Models/User';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { Observable, of, switchMap, BehaviorSubject } from 'rxjs';
import { A } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  availabilityForm!: FormGroup;
  //availabilities$: Observable<Availability[]> = of([]);
  availabilities!: Availability[];
  //private availabilitiesSubject = new BehaviorSubject<Availability[]>([]);
  teamMembers!: User[];
  //selectedAvailabilityList: any[] = [];
  originalAvailabilities!: Availability[];
  isListFiltered: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private availabilityService: AvailabilityService,
    private teamMemberService: TeamMemberService
  ){} //{this.availabilities$ = this.availabilitiesSubject.asObservable()}

  ngOnInit(): void {
    this.availabilityForm = this.formBuilder.group({
      selectedTeamMember: new FormControl({value: null, disabled: false}),
      selectedAvailability: new FormControl({value: null, disabled: true}),
      
     
    });

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
}