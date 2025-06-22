import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  imports: [PrimengModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isActive: [true] 
    });
  }

  get userName() {
    return this.userForm.get('userName');
  }

  get designation() {
    return this.userForm.get('designation');
  }

  get email() {
    return this.userForm.get('email');
  }

  goBack() {
    this.router.navigate(['/dashboard/uikit/manage-user']);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);

    }
  }

}
