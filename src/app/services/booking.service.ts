import { Injectable } from '@angular/core';
import { Booking } from '../Booking';
import { Observable, from, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiUrl);
  }
}
