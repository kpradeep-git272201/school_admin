import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/api/common.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-create-user',
    imports: [PrimengModule],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',

})
export class CreateUserComponent {
    userForm!: FormGroup;
    designationList = [];

    roleOptions:any = [];
    loading: boolean | undefined;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        const designation = localStorage.getItem('designation');
        if(designation){
            this.designationList=JSON.parse(designation);
        }
         const rolesList = localStorage.getItem('rolesList');
        if(rolesList){
            this.roleOptions=JSON.parse(rolesList);
        }

        this.createUserControle();

    }


    createUser(user: any) {
        this.loading = true;
        this.commonService.createUser(user).subscribe( {
            next: (res) => {
                this.sucessMessage('User created successfully!');
                this.createUserControle();
            },
            error: (err) => {
            if (err.status === 409) {
                const msg = err.error?.message || 'Email already exists';
                this.errorMessage(msg);
            } else {
                this.errorMessage('Something went wrong');
            }
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
        this.router.navigate(['/dashboard/uikit/manage-user']);
        //  this.sucessMessage('User created successfully!');
    }

    onSubmit() {
        if (this.userForm.valid) {
            const userForm = this.userForm.getRawValue();
            const roleIds:any=[];
            userForm.roles.forEach((role:any)=>{
                roleIds.push(role.code);
            })
            const user = {
                userName: userForm.userName,
                designation: userForm.designation.code,
                email: userForm.email,
                isActive: userForm.isActive,
                roleIds: roleIds
            };
            
            console.log('User Data:', JSON.stringify(user));
            this.createUser(user);
        } else {
            this.userForm.markAllAsTouched();
        }
    }
  createUserControle(){
        const defaultUserRole = this.roleOptions.find((role: { code: string; }) => role.code === 'ROLE_USER');
        this.userForm = this.fb.group({
            userName: ['', Validators.required],
            designation: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            isActive: ['Y'],
            roles: [[defaultUserRole], Validators.required]
        });
    }

  
    sucessMessage(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    errorMessage(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
}
