import { Component, OnInit } from '@angular/core';
import { Availability } from '../../interfaces/availability';
import { AvailabilityService } from '../../services/availability.service';
import { TeamMember } from '../../models/team-member';
import { TeamMemberService } from '../../services/team-member.service';
import { AuthService } from '../../services/auth.service';
import { AddAvailabilityDialogComponent } from '../add-availability-dialog/add-availability-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.component.html',
  styleUrls: ['./availabilities.component.css']
})
export class AvailabilitiesComponent implements OnInit {
  teamMembers!: TeamMember[];
  availabilities!: Availability[];

  constructor(
    private availabilityService: AvailabilityService,
    private teamMemberService: TeamMemberService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamMemberService.getTeamMembers().subscribe((teamMembers) => {
      this.teamMembers = teamMembers;

      const username = this.auth.getfullNameFromToken();
      const loggedInTeamMember = teamMembers.find((teamMember) => teamMember.userName === username);

      if (loggedInTeamMember) {
        this.availabilityService.getAvailabilities().subscribe((availabilities) => {
          this.availabilities = availabilities.filter(
            (availability) => availability.teamMemberId === loggedInTeamMember.teamMemberId
          );
        });
      }
    });
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


