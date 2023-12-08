import { Injectable } from '@angular/core';
import { Availability } from '../interfaces/availability';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'https://neatapi.azurewebsites.net/api/Availability';
  private deleteApiUrl = 'https://neatapi.azurewebsites.net/api/Availability/delete';
  constructor(private http: HttpClient) { }

  getAvailabilities(): Observable<Availability[]>{
    return this.http.get<Availability[]>(this.apiUrl);
  }

  getAvailabilitiesByUserId(userId: number): Observable<Availability[]>{
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<Availability[]>(url);
  }

  addAvailability(availability: Availability): Observable<Availability>{
    return this.http.post<Availability>(this.apiUrl, availability, httpOptions);
  }

  deleteAvailability(availabilityId: number): Observable<Availability>{
    console.log(availabilityId);
    const url = `${this.apiUrl}/${availabilityId}`;
    console.log(url);
    return this.http.delete<Availability>(url, httpOptions);
  }

  /*deleteAvailability(availabilityId: number): Observable<Availability>{
    console.log(typeof(availabilityId));
    return this.http.delete<Availability>(this.deleteApiUrl + availabilityId);
    
  }*/

  
  
}

