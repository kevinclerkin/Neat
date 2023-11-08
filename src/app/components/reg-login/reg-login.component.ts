import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-login',
  templateUrl: './reg-login.component.html',
  styleUrls: ['./reg-login.component.css']
})
export class RegLoginComponent {
  user = new User();

  constructor(private authService: AuthService, private router: Router){}

  register(user: User){
    this.authService.register(user).subscribe();
  }

  login(user: User){
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.router.navigate(['/'])
    });
  }

}
