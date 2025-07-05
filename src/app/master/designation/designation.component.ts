import { Component, inject } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { Router } from '@angular/router';

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
    constructor(
        private messageService: MessageService,
        private router: Router,
        private fb: FormBuilder,
        private commonService: CommonService
    ) {}
    ngOnInit() {
        const user = this.authService.getLoggedUser();
        this.userId = user.userId;
        const designation = localStorage.getItem('designation');
        if (designation) {
            this.designationList = JSON.parse(designation);
        }
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
        designationData.code=designationData.code.toUpperCase();
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
                this.designationList=designation;
                localStorage.setItem('designation', JSON.stringify(designation));
                const designationDisplay: any = {};
                designation.forEach((designation: any) => {
                    designationDisplay[designation.code] = designation.name;
                });
                localStorage.setItem('designationDisplay', JSON.stringify(designationDisplay));
            }
        });
    }
}
