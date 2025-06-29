import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/api/common.service';
import moment from 'moment';

@Component({
    selector: 'app-createbug',
    imports: [PrimengModule],
    templateUrl: './createbug.component.html',
    styleUrl: './createbug.component.scss',
    providers: [MessageService]
})
export class CreatebugComponent {
    selectedFile: File | null = null;
    assignToOpt: any = [];
    typeCombo: any = [];
    statusCombo: any = [];

    requesterCombo: any = [];
    dropdownItem = null;
    issueForm: any;
    uploadedFiles: any[] = [];
    displayUser: any = {};
    action: any;
    issueId: any;
    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private commonService: CommonService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getUser();

        this.createFormControle();
        this.patchValue();
    }

    ngOnDestroy(): void {
        const userData = localStorage.getItem('editIssue');
        if (userData) {
            localStorage.removeItem('editIssue');
        }
    }
    getUser() {
        const typeCombo = localStorage.getItem('typeCombo');
        const statusCombo = localStorage.getItem('statusCombo');
        const requesterCombo = localStorage.getItem('requesterCombo');
        const assignToOpt = localStorage.getItem('assignToOpt');
        const displayUser = localStorage.getItem('displayUser');

        if (statusCombo) {
            this.statusCombo = JSON.parse(statusCombo);
        }
        if (typeCombo) {
            this.typeCombo = JSON.parse(typeCombo);
        }
        if (requesterCombo) {
            this.requesterCombo = JSON.parse(requesterCombo);
        }
        if (assignToOpt) {
            this.assignToOpt = JSON.parse(assignToOpt);
        }
        if (displayUser) {
            this.displayUser = JSON.parse(displayUser);
        }
    }
    createFormControle() {
        const defaultStatus = this.statusCombo.find((status: { code: string }) => status.code === '1');
        this.issueForm = this.fb.group({
            projectCode: ['eGS 2.0', Validators.required],
            title: ['', Validators.required],
            requester: [null, Validators.required],
            status: [defaultStatus, Validators.required],
            assignTo: [null, Validators.required],
            attachment: [null],
            type: [null, Validators.required],
            startDate: [moment().format('YYYY-MM-DD'), Validators.required],
            endDate: [''],
            description: [''],
            remarks: ['']
        });
    }

    patchValue() {
        this.route.queryParams.subscribe((params) => {
            const action = params['action'];
            this.action = action;
            if (action === 'Edit') {
                const data = localStorage.getItem('editIssue');
                if (data) {
                    const editIssue = JSON.parse(data);
                    this.issueId = editIssue.id;
                    this.issueForm.patchValue(editIssue);
                    if (editIssue.attachmentBase64) {
                        const file = this.base64ToFile(
                            editIssue.attachmentBase64,
                            'attachment.png', // or 'file.pdf', etc.
                            'image/png' // or 'application/pdf', etc.
                        );

                        this.uploadedFiles = [file];
                    }
                }
            }
        });
    }
    onSubmit() {
        if (this.issueForm.valid) {
            if(this.action==='Edit'){
                this.updateIssue()
            }else{
                this.addIssue();
            }
        } else {
            this.issueForm.markAllAsTouched();
        }
    }

    addIssue() {
        if (this.issueForm.valid) {
            let formValue: any = this.issueForm.getRawValue();
            formValue.status = formValue.status;
            formValue.assignTo = formValue.assignTo;
            formValue.type = formValue.type;
            formValue.requester = formValue.requester;
            formValue.createdBy = 'admin@example.com';
            formValue.updatedBy = 'admin@example.com';
            formValue.createdDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
            formValue.updatedDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
            const jsonBlob = new Blob([JSON.stringify(formValue)], {
                type: 'application/json'
            });

            const formData = new FormData();
            formData.append('issue', jsonBlob);

            if (this.selectedFile) {
                formData.append('attachment', this.selectedFile);
            }
            console.log(JSON.stringify(formValue));
            this.commonService.addIssue(formData).subscribe({
                next: (res) => {
                    this.sucessMessage('Issue created successfully!');
                    this.createFormControle();
                },
                error: (err) => this.errorMessage(err)
            });
        } else {
            this.issueForm.markAllAsTouched();
        }
    }

    updateIssue() {
        if (this.issueForm.valid) {
            let formValue: any = this.issueForm.getRawValue();
            formValue.status = formValue.status;
            formValue.assignTo = formValue.assignTo;
            formValue.type = formValue.type;
            formValue.requester = formValue.requester;
            formValue.createdBy = 'admin@example.com';
            formValue.updatedBy = 'admin@example.com';
            formValue.createdDate = formValue.createdDate||moment().format('YYYY-MM-DD');
            formValue.updatedDate = moment().format('YYYY-MM-DD');
            const jsonBlob = new Blob([JSON.stringify(formValue)], {
                type: 'application/json'
            });

            const formData = new FormData();
            formData.append('issue', jsonBlob);

            if (this.selectedFile) {
                formData.append('attachment', this.selectedFile);
            }
            console.log(JSON.stringify(formValue));
            this.commonService.updatedIssue(formData, this.issueId).subscribe({
                next: (res) => {
                    this.sucessMessage('Issue updated successfully!');
                },
                error: (err) => this.errorMessage(err)
            });
        } else {
            this.issueForm.markAllAsTouched();
        }
    }
    onFileChange(event: any) {
        const file = event.target.files?.[0];
        if (file) {
            this.selectedFile = file;
        }
    }
    onUpload(event: any) {
        const files: File[] = event.files;
        this.uploadedFiles = files;
        if (files && files.length > 0) {
            this.selectedFile = files[0];
            console.log('Selected file:', this.selectedFile);
        }
        this.issueForm.patchValue({
            attachment: files
        });
        this.issueForm.get('attachment')?.markAsTouched();
    }

    onFileSelected(event: any) {
        const file = event.files;
        if (file) {
            this.selectedFile = file[0];
        }
    }
    get projectCode() {
        return this.issueForm.get('projectCode');
    }
    get title() {
        return this.issueForm.get('title');
    }

    get requester() {
        return this.issueForm.get('requester');
    }
    get status() {
        return this.issueForm.get('status');
    }

    get assignTo() {
        return this.issueForm.get('assignTo');
    }
    get type() {
        return this.issueForm.get('type');
    }

    get startDate() {
        return this.issueForm.get('startDate');
    }

    backToPerevious() {
        this.router.navigate(['/dashboard/uikit/manage-bug']);
    }

    sucessMessage(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }

    errorMessage(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

    base64ToFile(base64: string, fileName: string, mimeType: string): File {
        const byteString = atob(base64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new File([intArray], fileName, { type: mimeType });
    }
}
