import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
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
    assignToOpt: any = [
        { name: 'Pradeep', code: '1' },
        { name: 'Suraj', code: '2' },
        { name: 'Shreya', code: '3' },
        { name: 'Ajay', code: '4' }
    ];
    typeCombo: any = [
        { name: 'Bug', code: '1' },
        { name: 'Issue', code: '2' },
        { name: 'Feature', code: '3' },
        { name: 'Enhancement', code: '4' }
    ];
    statusCombo: any = [
        { name: 'Pending', code: '1' },
        { name: 'In Progress', code: '2' },
        { name: 'Completed', code: '3' },
        { name: 'Rejected', code: '4' },
        { name: 'Resolved', code: '5' }
    ];

    requesterCombo: any=[];
    dropdownItem = null;
    issueForm: any;
    uploadedFiles: any[] = [];
    displayUser:any={};
    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        this.getUser();
        this.createFormControle();
    }


    getUser(){
        this.commonService.getUserList().subscribe((user) => {
          if(user.status==200){
            const userList = user.body;
            userList.forEach((user:any)=>{
                this.requesterCombo.push({ name: user.userName, code: user.id });
                this.displayUser[user.id]=user.userName;
            })
          }
        });
    }
    createFormControle() {
        const defaultStatus = this.statusCombo.find((status: { code: string }) => status.code === '1');
        this.issueForm = this.fb.group({
            projectCode: ['eGS 2.0', Validators.required],
            title: ['', Validators.required],
            requester: ['', Validators.required],
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

    onSubmit() {
        if (this.issueForm.valid) {
            this.addIssue();
        } else {
            this.issueForm.markAllAsTouched();
        }
    }

    addIssue() {
        if (this.issueForm.valid) {
            let formValue: any = this.issueForm.getRawValue();
            formValue.status=formValue.status.code;
            formValue.assignTo=formValue.assignTo.code;
            formValue.type=formValue.type.code;
            formValue.requester=formValue.requester.code;
            formValue.createdBy = 'admin@example.com';
            formValue.updatedBy = 'admin@example.com';
            formValue.createdDate = moment().format('YYYY-MM-DD');
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
            this.commonService.addIssue(formData).subscribe({
                next: (res) => console.log('Issue created:', res),
                error: (err) => console.error('Error creating issue:', err)
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
}
