import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-createbug',
    imports: [PrimengModule],
    templateUrl: './createbug.component.html',
    styleUrl: './createbug.component.scss',
    providers: [MessageService]
})
export class CreatebugComponent {
    dropdownItems: any = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
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
    dropdownItem = null;
    issueForm: any;
    uploadedFiles: any[] = [];
    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.createFormControle();
    }

    createFormControle() {
        this.issueForm = this.fb.group({
            projectCode: ['', Validators.required],
            title: ['', Validators.required],
            requester: ['', Validators.required],
            status: [null, Validators.required],
            assignTo: [null, Validators.required],
            attachment: [null],
            type: [null, Validators.required],
            startDate: ['', Validators.required],
            endDate: [''],
            description: [''],
            remarks: ['']
        });
    }

    onSubmit() {
        if (this.issueForm.valid) {
            console.log(this.issueForm.value);
        } else {
            this.issueForm.markAllAsTouched();
        }
    }

    onFileChange(event: any) {
        const file = event.target.files?.[0];
        if (file) {
            this.issueForm.patchValue({ attachment: file });
        }
    }

    onUpload(event: any) {
        const files: File[] = event.files;
        this.uploadedFiles = files;
        this.issueForm.patchValue({
            attachment: files
        });
        this.issueForm.get('attachment')?.markAsTouched();
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
