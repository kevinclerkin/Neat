import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/team-member.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  public teamMembers:any = [];

  constructor(private team : TeamMemberService) { }

  ngOnInit() {
    this.team.getTeamMembers().subscribe((teamMembers)=>{
      this.teamMembers = teamMembers;
    });

    
}

}