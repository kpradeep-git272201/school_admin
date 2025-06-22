import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [PrimengModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup | any;
  loginTemplate:string='Login';
  otpInput:string = '';
  constructor(private fb: FormBuilder,
    private router: Router
  ){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      console.log('Email submitted:', email);
      this.loginTemplate="Otp";
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  verifyCode(){
    console.log(this.otpInput);
    this.router.navigate(['/dashboard'])
  }
}
