// Adapted from https://github.com/yshashi/AngularAuthYtAPI

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenModel } from '../models/token-model';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'https://neatapi.azurewebsites.net/api/NewAuth';
  private apiLoginUrl: string = 'https://neatapi.azurewebsites.net/api/NewAuth/authenticate'
  private userPayload:any;

  constructor(private http: HttpClient, private router: Router){
    this.userPayload = this.decodedToken();
  }

  signUp(memberObj: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, memberObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.apiUrl}/authenticate`,loginObj)
  }

  signOut(){
    const res = localStorage.clear();
    console.log(res);
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenModel){
    return this.http.post<any>(`${this.apiUrl}refresh`, tokenApi)
  }

  getTeamMemberIdFromToken(): number | null {
    if (this.userPayload) {
      return this.userPayload.teamMemberId;
    }
    return null;
  }
}
