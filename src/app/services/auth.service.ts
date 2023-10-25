import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerApiUrl: string = "https://localhost:7193/api/Auth/register";

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any>{
    return this.http.post<any>(this.registerApiUrl, user);
  }
}
