import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Availability } from 'src/app/Availability';
import { AvailabilityService } from 'src/app/services/availability.service';
import { User } from 'src/app/Models/User';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { Observable, of, switchMap, BehaviorSubject } from 'rxjs';

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
  selectedAvailabilityList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private availabilityService: AvailabilityService,
    private teamMemberService: TeamMemberService
  ) {}//{this.availabilities$ = this.availabilitiesSubject.asObservable();}

  ngOnInit(): void {
    this.availabilityForm = this.formBuilder.group({
      selectedTeamMember: new FormControl(null),
      selectedAvailability: new FormControl({value: null, disabled: true})
     
    });

    this.availabilityService.getAvailabilities().subscribe((availabilities)=> {
      this.availabilities = availabilities;
    })

    

    this.teamMemberService.getUsers().subscribe((teamMembers)=>{
      this.teamMembers = teamMembers;
    })

    this.availabilityForm.get('selectedTeamMember')?.valueChanges.subscribe((res: number)=>{
      console.log(res);
      this.availabilityForm.get('selectedAvailability')?.setValue(null);
      if(res){
        this.selectedAvailabilityList = this.teamMembers.filter((obj: any)=> obj.userId === res);
        this.availabilityForm.get('selectedAvailability')?.enable();
      }else{
        this.availabilityForm.get('selectedAvailability')?.disable();
      }

    });






    /*this.availabilityService.getAvailabilities().subscribe((availabilities) => {
      this.availabilitiesSubject.next(availabilities);
    });*/

    /*this.availabilityForm.get('selectedTeamMember')?.valueChanges.pipe(
      switchMap((userId)=> this.availabilityService.getAvailabilitiesByUserId(userId))
    ).subscribe((availabilities)=> {
      this.availabilities$ = of(availabilities);
    });*/

    /*this.availabilityForm.get('selectedTeamMember')?.valueChanges.pipe(
      switchMap((userId) => this.availabilityService.getAvailabilitiesByUserId(userId))
    ).subscribe((availabilities) => {
      this.availabilitiesSubject.next(availabilities);
    });*/
    
  }
}