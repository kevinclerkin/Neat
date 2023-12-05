import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { TeamMember } from '../models/team-member';

headers: new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
 private newAuthUrl = 'https://neatapi.azurewebsites.net/api/NewAuth/team-members';
  
  constructor(private http: HttpClient) { }

  

  getTeamMembers(): Observable<TeamMember[]>{
    return this.http.get<TeamMember[]>(this.newAuthUrl);
  }
}
