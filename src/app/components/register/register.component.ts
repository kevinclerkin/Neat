import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator

  })
  constructor(private fb: FormBuilder){}

  get username(){
    return this.registerForm.controls['username'];
  }

  get password(){
    return this.registerForm.controls['password'];
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }

}
