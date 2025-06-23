import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-create-user',
    imports: [PrimengModule],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
    providers: [MessageService]
})
export class CreateUserComponent {
    userForm!: FormGroup;
    designationList = [
        { name: 'Manager', code: '1' },
        { name: 'Business Analyst', code: '2' },
        { name: 'Sr. Software Developer', code: '3' },
        { name: 'Software Developer', code: '3' },
        { name: 'Tester', code: '3' }
    ];
  loading: boolean | undefined;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        this.userForm = this.fb.group({
            userName: ['', Validators.required],
            designation: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            isActive: ['Y']
        });
    }

    createUser(user: any) {
        this.loading = true;
        this.commonService.createUser(user).subscribe((user) => {
            if (user.status == 201) {
                this.loading = false;
                this.sucessMessage('User created successfully!');
                this.userForm.reset();
            }else{
              this.loading = false;
              this.errorMessage('User creation failed!');
            }
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
        // this.router.navigate(['/dashboard/uikit/manage-user']);
         this.sucessMessage('User created successfully!');
    }

    onSubmit() {
        if (this.userForm.valid) {
            const userForm = this.userForm.getRawValue();
            const user = {
                userName: userForm.userName,
                designation: userForm.designation.code,
                email: userForm.email,
                isActive: userForm.isActive
            };
            console.log('User Data:', user);
            this.createUser(user);
        } else {
            this.userForm.markAllAsTouched();
        }
    }

    sucessMessage(message:string){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    errorMessage(message:string){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
}
