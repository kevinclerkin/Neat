import { Injectable } from '@angular/core';
import { Availability } from '../Availability';
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
  private apiUrl = 'https://localhost:7193/api/Availability';

  constructor(private http: HttpClient) { }

  getAvailabilities(): Observable<Availability[]>{
    return this.http.get<Availability[]>(this.apiUrl);
  }
}
