import { Component, inject } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../../services/encrypt/encrypt-decrypt.service';

@Component({
    selector: 'app-designation',
    imports: [PrimengModule],
    templateUrl: './designation.component.html',
    styleUrl: './designation.component.scss',
    providers: [MessageService]
})
export class DesignationComponent {
    designationList: any = [];
    loading: boolean = false;
    userId: any;
    statusForm!: FormGroup;
    submitted = false;
    private authService = inject(AuthService);
    showRoleDialog: boolean = false;
    designationForm: any;
    isAdmin: any;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private fb: FormBuilder,
        private commonService: CommonService,
        private encrypDecryptService: EncryptDecryptService
    ) {}
    ngOnInit() {
        const encrypted = localStorage.getItem('encrypted');
        const user = this.encrypDecryptService.getDecryptedData(encrypted);
        this.userId = user.userId;
        this.isAdmin = user.roleIds.includes('ROLE_ADMIN') || user.roleIds.includes('ROLE_MANAGER');
        this.getDesigantion();
        this.createDesignationForm();
    }
    createDesignationForm() {
        this.designationForm = this.fb.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            description: [''],
            isActive: [true, Validators.required],
            updatedBy: [this.userId],
            createdBy: [this.userId]
        });
    }

    createDesignation() {
        this.showRoleDialog = true;
    }

    sucessMessage(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    errorMessage(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

    cancelDesignation() {
        this.designationForm.reset();
        this.submitted = false;
        this.showRoleDialog = false;
    }

    saveDesignation() {
        this.submitted = true;

        if (this.designationForm.invalid) return;

        const designationData = this.designationForm.getRawValue();
        designationData.code = designationData.code.toUpperCase();
        console.log('Saving Designation:', designationData);

        this.commonService.addDesignation(designationData).subscribe({
            next: (res) => {
                this.sucessMessage('Designation added successfully!');
                this.getDesigantion();
            },
            error: (err) => {
                this.errorMessage('Something went wrong');
            }
        });

        this.designationForm.reset();
        this.submitted = false;
        this.showRoleDialog = false;
    }

    getDesigantion() {
        this.commonService.getDesignation().subscribe((user) => {
            if (user.status == 200) {
                const designation = user.body;
                this.designationList = designation;
            }
        });
    }
}
