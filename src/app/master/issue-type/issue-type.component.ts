import { Component, inject } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../../services/encrypt/encrypt-decrypt.service';

@Component({
    selector: 'app-issue-type',
    imports: [PrimengModule],
    templateUrl: './issue-type.component.html',
    styleUrl: './issue-type.component.scss',
    providers: [MessageService]
})
export class IssueTypeComponent {
    typeCombo: any = [];
    loading: boolean = false;
    userId: any;
    issueTypeForm!: FormGroup;
    submitted = false;
    showIssueTypeDialog = false;
    private authService = inject(AuthService);
    showRoleDialog: boolean = false;
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
        this.loading=true;
        this.getIssueType(); 
        this.createIssueForm();
    }

    createIssueForm() {
        this.issueTypeForm = this.fb.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            description: [''],
            isActive: [true, Validators.required],
            updatedBy: [this.userId],
            createdBy: [this.userId]
        });
    }
    createIssueType() {
        this.showIssueTypeDialog = true;
    }

    cancelIssueType() {
        this.issueTypeForm.reset();
        this.submitted = false;
        this.showIssueTypeDialog = false;
    }

    onChange(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        const selectedRoles = input.value;
        this.issueTypeForm.controls['code'].setValue(selectedRoles.toUpperCase());
    }
    saveIssueType() {
        this.submitted = true;
        if (this.issueTypeForm.invalid) return;

        const issueType = this.issueTypeForm.getRawValue();
        console.log('Saving Issue Type:', issueType);

        this.commonService.addIssueType(issueType).subscribe({
            next: (res) => {
                this.sucessMessage('Issue Type added successfully!');
                this.getIssueType();
            },
            error: (err) => {
                this.errorMessage('Something went wrong');
            }
        });

        this.issueTypeForm.reset();
        this.submitted = false;
        this.showIssueTypeDialog = false;
    }
    getIssueType() {
        this.commonService.getIssueType().subscribe((type) => {
            this.loading=false;
            if (type.status == 200) {
                const typeCombo = type.body;
                this.typeCombo = typeCombo;
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
