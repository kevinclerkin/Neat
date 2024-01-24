import { Component, OnInit } from '@angular/core';
import { Availability } from '../../interfaces/availability';
import { AvailabilityService } from '../../services/availability.service';
import { TeamMember } from '../../models/team-member';
import { TeamMemberService } from '../../services/team-member.service';
import { AuthService } from '../../services/auth.service';
import { AddAvailabilityDialogComponent } from '../add-availability-dialog/add-availability-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from 'primeng/calendar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.component.html',
  styleUrls: ['./availabilities.component.css']
})
export class AvailabilitiesComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  availabilities: Availability[] = [];
  formGroup!: FormGroup;

  constructor(
    private availabilityService: AvailabilityService,
    private teamMemberService: TeamMemberService,
    private auth: AuthService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.teamMemberService.getTeamMembers().subscribe((teamMembers) => {
      this.teamMembers = teamMembers;
      console.log('Team Members:', teamMembers);

      //const username = this.auth.getfullNameFromToken();
      const currentTeamMember = this.auth.decodedToken();
      console.log('Current Team Member:', currentTeamMember);
      console.log('Username:', currentTeamMember.unique_name);
      const loggedInTeamMember = teamMembers.find((teamMember) => teamMember.userName === currentTeamMember.username);
      console.log('Logged In Team Member:', loggedInTeamMember);

      if (loggedInTeamMember) {
        this.availabilityService.getAvailabilities().subscribe((availabilities) => {
          this.availabilities = availabilities.filter(
            (availability) => availability.teamMemberId === loggedInTeamMember.teamMemberId
          );
        });
      }
    });
  }

  initializeForm(): void {
    // Initialize the form with a 'date' FormControl
    this.formGroup = this.fb.group({
      date: [null, Validators.required],
    });
  }

  onSubmit(): void {
    console.log('Submit button clicked');
    if (this.formGroup && this.formGroup.get('date')) {
      const selectedDate = this.formGroup.get('date')?.value;
      console.log('Selected Date:', selectedDate);

      const loggedInTeamMember = this.teamMembers.find(
        (teamMember) => teamMember.userName === this.auth.getfullNameFromToken()
      );

      if (loggedInTeamMember) {
        const newAvailability: Availability = {
          dateTime: selectedDate,
          teamMemberId: loggedInTeamMember.teamMemberId,
          
        };

        this.availabilityService.addAvailability(newAvailability).subscribe((addedAvailability) => {
          this.availabilities.push(addedAvailability);
          console.log('New Availability:', addedAvailability);
        });
      }
    } else {
      console.log('Form or form control is null. Please check the form initialization.');
    }
  }

  openAddAvailabilityDialog(): void {
    const loggedInTeamMember = this.teamMembers.find(
      (teamMember) => teamMember.userName === this.auth.getfullNameFromToken()
    );
    if (loggedInTeamMember) {
      const dialogRef = this.dialog.open(AddAvailabilityDialogComponent, {
        width: '300px',
        data: {}
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.dateTime) {
          const availabilityData = {
            dateTime: result.dateTime,
            teamMemberId: loggedInTeamMember?.teamMemberId
          };

          this.availabilityService.addAvailability(availabilityData).subscribe((newAvailability) => {
            this.availabilities.push(newAvailability);
            console.log('New Availability:', newAvailability);
          });
        }
      });
    }
  }



  deleteAvailabilityById(availability: Availability): void {
    const availabilityId = availability.availabilityId;
    if (availabilityId !== undefined) {
      this.availabilityService.deleteAvailability(availabilityId).subscribe(() => {
        this.availabilities = this.availabilities.filter((a) => a.availabilityId !== availabilityId);
        console.log(`Deleted Availability with ID ${availabilityId}`);
      });
    } else {
      console.error('Availability ID is Undefined');
    }
  }



}


