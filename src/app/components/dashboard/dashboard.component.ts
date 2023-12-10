import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../services/team-member.service';
import { AuthService } from '../../services/auth.service';
import { UserRoleService } from '../../services/user-role.service';
import { charts } from 'highcharts';
import { Booking } from '../../interfaces/booking';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public teamMembers:any = [];
  public role!:string;
  sidebarActive: boolean = false;

  public fullName : string = "";
  constructor(private team : TeamMemberService, private auth: AuthService, private userRole: UserRoleService) { }


  ngOnInit() {
    this.team.getTeamMembers()
    .subscribe(res=>{
    this.teamMembers = res;
    });

    this.userRole.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userRole.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })



  }

  logout(){
    this.auth.signOut();
  }


}
