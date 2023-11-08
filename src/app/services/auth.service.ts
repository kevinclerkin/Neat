import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerApiUrl: string = "https://localhost:7193/api/Auth/register";
  loginApiUrl: string = "https://localhost:7193/api/Auth/login";
  
  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<any>{
    return this.http.post<any>(this.registerApiUrl, user);
  }

  login(user: User): Observable<string>{
    return this.http.post(this.loginApiUrl, user, {responseType: "text"});
  }
}
