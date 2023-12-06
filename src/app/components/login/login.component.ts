import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UserRoleService } from '../../services/user-role.service';
import ValidateForm from '../../validation/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    
    private userRole: UserRoleService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userRole.setFullNameForStore(tokenPayload.name);
          this.userRole.setRoleForStore(tokenPayload.role);
          //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['admin'])
        },
        error: (err) => {
          //this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration: 5000});
          console.log(err);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

}
