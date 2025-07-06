import { Component, inject } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
    selector: 'app-issue-status',
    imports: [PrimengModule],
    templateUrl: './issue-status.component.html',
    styleUrl: './issue-status.component.scss',
    providers: [MessageService]
})
export class IssueStatusComponent {
    statusCombo: any = [];
    loading: boolean = false;
    userId: any;
    statusForm!: FormGroup;
    submitted = false;
    private authService = inject(AuthService);
    showRoleDialog: boolean = false;
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
        const statusCombo = localStorage.getItem('statusCombo');
        if (statusCombo) {
            this.statusCombo = JSON.parse(statusCombo);
        }

        this.createStatusForm();
    }

      onChange(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        const selected = input.value;
        this.statusForm.controls['code'].setValue(selected.toUpperCase());
    }
    createStatusForm() {
        this.statusForm = this.fb.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            description: [''],
            isActive: [true, Validators.required],
            updatedBy: [this.userId],
            createdBy: [this.userId]
        });
    }
    cancelStatus() {
        this.statusForm.reset();
        this.submitted = false;
        this.showRoleDialog = false; // if used inside p-dialog
    }

    saveStatus() {
        this.submitted = true;
        if (this.statusForm.invalid) return;

        const statusData = this.statusForm.getRawValue();
        console.log('Saving status:', JSON.stringify(statusData));

        this.commonService.addStatus(statusData).subscribe({
            next: (res) => {
                 this.showRoleDialog = false;
                this.sucessMessage('Status added successfully!');
                this.getIssueStatus();
            },
            error: (err) => {
                this.errorMessage('Something went wrong');
            }
        });

        this.statusForm.reset();
        this.submitted = false;
         this.showRoleDialog = false;
    }

    createStatus() {
        this.showRoleDialog = true;
    }

    sucessMessage(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    errorMessage(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

     getIssueStatus() {
        this.commonService.getIssueStatus().subscribe((status) => {
            if (status.status == 200) {
                const statusCombo = status.body;
                this.statusCombo=statusCombo;
                localStorage.setItem('statusCombo', JSON.stringify(statusCombo));
                if(status.body){
                    const statusDisplay:any={};
                    status.body.forEach((status:any)=>{
                        statusDisplay[status.code]=status.name;
                    });
                    localStorage.setItem('statusDisplay', JSON.stringify(statusDisplay));
                }
            }
        });
    }
}
