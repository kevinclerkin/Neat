import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { User } from '../Models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Availability } from '../Availability';

headers: new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
  private apiUrl = 'https://localhost:7193/api/User';
  private newAuthUrl = 'https://localhost:7193/api/NewAuth';
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);

  }

  getTeamMembers(){
    return this.http.get<any>(this.newAuthUrl);
  }
}
