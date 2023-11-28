import { Component, OnInit } from '@angular/core';
import { NewAuthService } from 'src/app/services/new-auth.service';
import { NeatService } from 'src/app/services/neat.service';
import { AdminComponent } from '../admin/admin.component';
import { UserRoleService } from 'src/app/services/user-role.service';
import { TeamMemberService } from 'src/app/services/team-member.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public teamMembers:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(private team : TeamMemberService, private auth: NewAuthService, private userRole: UserRoleService) { }

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
