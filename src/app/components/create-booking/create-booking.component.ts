import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Availability } from 'src/app/Availability';
import { AvailabilityService } from 'src/app/services/availability.service';
import { User } from 'src/app/Models/User';
import { TeamMemberService } from 'src/app/services/team-member.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  availabilityForm!: FormGroup;
  availabilities$: Observable<Availability[]> = of([]);
  teamMembers!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private availabilityService: AvailabilityService,
    private teamMemberService: TeamMemberService
  ) {}

  ngOnInit(): void {
    this.availabilityForm = this.formBuilder.group({
      selectedTeamMember: new FormControl(null),
      selectedAvailability: new FormControl(null)
     
    });

    this.availabilities$ = this.availabilityService.getAvailabilities();

    this.teamMemberService.getUsers().subscribe((teamMembers)=>{
      this.teamMembers = teamMembers;
    })

    this.availabilityForm.get('selectedTeamMember')?.valueChanges.pipe(
      switchMap((userId)=> this.availabilityService.getAvailabilitiesByUserId(userId))
    ).subscribe((availabilities)=> {
      this.availabilities$ = of(availabilities);
    });
    
  }
}