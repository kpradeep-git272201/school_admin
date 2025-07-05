import { Component, inject } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { Router } from '@angular/router';

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
    constructor(
        private messageService: MessageService,
        private router: Router,
        private fb: FormBuilder,
        private commonService: CommonService
    ) {}
    ngOnInit() {
        const user = this.authService.getLoggedUser();
        this.userId = user.userId;
        const typeCombo = localStorage.getItem('typeCombo');
        if (typeCombo) {
            this.typeCombo = JSON.parse(typeCombo);
        }
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
            if (type.status == 200) {
                const typeCombo = type.body;
                this.typeCombo = typeCombo;
                localStorage.setItem('typeCombo', JSON.stringify(typeCombo));
                if (type.body) {
                    const typeComboObj: any = {};
                    type.body.forEach((type: any) => {
                        typeComboObj[type.code] = type.name;
                    });
                    localStorage.setItem('typeComboObj', JSON.stringify(typeComboObj));
                }
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
