import { Injectable } from '@angular/core';
import { ServiceOption } from '../models/service-option';
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
  private apiUrl = 'https://neatapi.azurewebsites.net/api/NeatService';

  constructor(private http: HttpClient) { }

  getServices(): Observable<ServiceOption[]>{
    return this.http.get<ServiceOption[]>(this.apiUrl)
  }

  createService(service: ServiceOption): Observable<ServiceOption>{
    return this.http.post<ServiceOption>(this.apiUrl, service, httpOptions);
  }

  deleteService(service: ServiceOption): Observable<ServiceOption>{
    const url = `${this.apiUrl}/${service.serviceId}`;
    return this.http.delete<ServiceOption>(url);
  }

  updateService(serviceId: number, service: ServiceOption): Observable<any>{
    const url = `${this.apiUrl}/${serviceId}`;
    return this.http.put(url, service, httpOptions);
  }
}