import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/api/common.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
    selector: 'app-create-user',
    imports: [PrimengModule],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
    userForm!: FormGroup;
    designationList = [];

    roleOptions: any = [];
    loading: boolean | undefined;
    action: any;
    userId: any;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private commonService: CommonService,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnDestroy(): void {
        const userData = localStorage.getItem('editUser');
        if (userData) {
            localStorage.removeItem('editUser');
        }
    }

    ngOnInit(): void {
        const designation = localStorage.getItem('designation');
        if (designation) {
            this.designationList = JSON.parse(designation);
        }
        const rolesList = localStorage.getItem('rolesList');
        if (rolesList) {
            this.roleOptions = JSON.parse(rolesList);
        }

        this.createUserControle();
        this.patchValue();
    }

    patchValue(){
        this.route.queryParams.subscribe((params) => {
            const action = params['action'];
            this.action=action;
            if (action === 'Edit') {
                const userData = localStorage.getItem('editUser');
                if (userData) {
                    const user = JSON.parse(userData);
                    this.userId=user.id;
                    const defaultUserRole = this.roleOptions.filter((role: { code: string }) =>{return user.roleIds.includes(role.code)});
                    delete user['roleIds'];
                    user.roles=defaultUserRole;
                    this.userForm.patchValue(user);
                }
            }
        });
    }
    createUser(user: any) {
        this.loading = true;
        this.commonService.createUser(user).subscribe({
            next: (res) => {
                this.sucessMessage('User created successfully!');
                this.createUserControle();
                this.getUserList();
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

    updateUser(userId:any, user: any) {
        this.loading = true;
        this.commonService.updateUser(userId, user).subscribe({
            next: (res) => {
                this.sucessMessage('User updated successfully!');
                this.getUserList();
            },
            error: (err) => {
                if (err.status === 404) {
                    this.errorMessage('User updation failed!');
                } else {
                    this.errorMessage('Something went wrong');
                }
            }
        });
    }
    get username() {
        return this.userForm.get('username');
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
            const roleIds: any = [];
            userForm.roles.forEach((role: any) => {
                roleIds.push(role.code);
            });
            const user = {
                username: userForm.username,
                designation: userForm.designation.code,
                email: userForm.email,
                isActive: userForm.isActive,
                roleIds: roleIds
            };

            console.log('User Data:', JSON.stringify(user));
            if(this.action === 'Edit'){
                this.updateUser(this.userId ,user);
            }else{
                this.createUser(user);
            }
            
        } else {
            this.userForm.markAllAsTouched();
        }
    }
    createUserControle() {
        const defaultUserRole = this.roleOptions.find((role: { code: string }) => role.code === 'ROLE_USER');
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            designation: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            isActive: ['Y'],
            roles: [[defaultUserRole], Validators.required]
        });
    }

    getUserList() {
        this.commonService.getUserList().subscribe((user) => {
            if (user.status == 200) {
                localStorage.removeItem('userList');
                localStorage.removeItem('assignToOpt');
                localStorage.removeItem('requesterCombo');
                localStorage.removeItem('displayUser');
                const userList = user.body;
                localStorage.setItem('userList', JSON.stringify(userList));
                const assignToOpt: any = [];
                const requesterCombo: any = [];
                const displayUser: any = {};
                userList.forEach((user: any) => {
                    assignToOpt.push({ name: user.username, code: user.id + '' });
                    requesterCombo.push({ name: user.username, code: user.id + '' });
                    displayUser[user.id] = user.username;
                });
                localStorage.setItem('assignToOpt', JSON.stringify(assignToOpt));
                localStorage.setItem('requesterCombo', JSON.stringify(requesterCombo));
                localStorage.setItem('displayUser', JSON.stringify(displayUser));
            }
        });
    }

    sucessMessage(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    errorMessage(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
}
