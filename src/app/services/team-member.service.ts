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
  private apiUrl = 'https://localhost:7003/api/User';
  private newAuthUrl = 'https://localhost:7003/api/NewAuth';
  
  constructor(private http: HttpClient) { }

  

  getTeamMembers(): Observable<TeamMember[]>{
    return this.http.get<any>(this.newAuthUrl);
  }
}
