import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router ){}

  login(user: User){
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.router.navigate(['/'])
    });
  }

  get username(){
    return this.loginForm.controls['username'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }
}
