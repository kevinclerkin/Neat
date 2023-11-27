import { Injectable } from '@angular/core';
import { ServiceOption } from '../Models/ServiceOption';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class NeatService {
  private apiUrl = 'https://localhost:7193/api/NeatService';

  constructor(private http: HttpClient) { }

  getServices(): Observable<ServiceOption[]>{
    return this.http.get<ServiceOption[]>(this.apiUrl)
  }
}