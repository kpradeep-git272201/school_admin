import { Component, inject } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { Router } from '@angular/router';
import { CommonService } from '../../services/api/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-roles',
    imports: [PrimengModule],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    providers: [MessageService]
})
export class RolesComponent {
    loading: boolean = true;
    rolesList: any = [];
    roleDisplay: any = {};

    roleForm!: FormGroup;
    showRoleDialog = false;
    submitted = false;
    private authService = inject(AuthService);
    userId: any;
    isAdmin: any;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private fb: FormBuilder,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        const user = this.authService.getLoggedUser();
        this.userId = user.userId;
        this.isAdmin = user.roleIds.includes('ROLE_ADMIN') || user.roleIds.includes('ROLE_MANAGER');
        const roleDisplay = localStorage.getItem('roleDisplay');
        if (roleDisplay) {
            this.roleDisplay = JSON.parse(roleDisplay);
        }
        const rolesList = localStorage.getItem('rolesList');
        if (rolesList) {
            this.rolesList = JSON.parse(rolesList);
        }else{
            this.getRoles();
        }
        this.loading = false;

        this.createFormControl();
    }

    createRole() {
        this.showRoleDialog = true;
    }

    createFormControl() {
        this.roleForm = this.fb.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            description: [''],
            isActive: [true],
            updatedBy: [this.userId],
            createdBy: [this.userId]
        });
    }
    saveRole() {
        this.submitted = true;

        if (this.roleForm.invalid) return;
        const newRole = this.roleForm.getRawValue();
        console.log(JSON.stringify(newRole));
        this.commonService.createRoles(newRole).subscribe({
            next: (res) => {
                this.sucessMessage('Role created successfully!');
                this.getRoles();
            },
            error: (err) => {
                this.errorMessage('Something went wrong');
            }
        });
        this.showRoleDialog = false;
        this.roleForm.reset();
    }

    cancel() {
        this.roleForm.reset(); // Reset form fields
        this.submitted = false; // Reset validation flag
        this.showRoleDialog = false; // Close the dialog
    }

    get isActive() {
        return this.roleForm.get('isActive');
    }

    onChangeRole(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        const selectedRoles = input.value;
        this.roleForm.controls['code'].setValue(selectedRoles.toUpperCase());
    }

    getRoles() {
        this.commonService.getRoles().subscribe((user) => {
            if (user.status == 200) {
                const rolesList = user.body;
                this.rolesList=rolesList;
                localStorage.setItem('rolesList', JSON.stringify(rolesList));
                const roleDisplay: any = {};
                rolesList.forEach((role: any) => {
                    roleDisplay[role.code] = role.name;
                });
                localStorage.setItem('roleDisplay', JSON.stringify(roleDisplay));
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
