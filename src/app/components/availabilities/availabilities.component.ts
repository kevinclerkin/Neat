import { Component, OnInit } from '@angular/core';
import { Availability } from '../../interfaces/availability';
import { AvailabilityService } from '../../services/availability.service';
import { TeamMember } from '../../models/team-member';
import { TeamMemberService } from '../../services/team-member.service';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.component.html',
  styleUrl: './availabilities.component.css'
})
export class AvailabilitiesComponent implements OnInit{
  teamMembers!: TeamMember[];
  availabilities!: Availability[];

  constructor(private availabilityService: AvailabilityService, private teamMemberService: TeamMemberService){
    this.teamMemberService.getTeamMembers().subscribe((teamMembers)=>{
      this.teamMembers = teamMembers;
    });
  }

  ngOnInit(): void {
    this.availabilityService.getAvailabilities().subscribe((availabilities)=> {
      this.availabilities = availabilities;
    });
  }

  

  deleteAvailability(){}

}
