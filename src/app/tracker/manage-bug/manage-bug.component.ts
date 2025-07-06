import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrimengModule } from '../../primeng/primeng.module';
import { ProductService } from '../../pages/service/product.service';
import { Table } from 'primeng/table';
import { CustomerService, Representative } from '../../pages/service/customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { AuthService } from '../../services/authentication/auth.service';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from '../../services/encrypt/encrypt-decrypt.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-manage-bug',
    imports: [PrimengModule],
    templateUrl: './manage-bug.component.html',
    styleUrl: './manage-bug.component.scss',
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class ManageBugComponent implements OnInit {
    visible: boolean = false;
    loading: boolean = true;
    representatives: Representative[] = [];
    activityValues: number[] = [0, 100];
    balanceFrozen: boolean = false;
    issueList: any = [];
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt') dt!: Table;
    showPreview = false;
    previewAttachment: string | null = null;
    displayUser: any = {};
    typeComboObj: any = {};
    queryList = [
        {
            code: 1,
            name: 'All Issue'
        },
        {
            code: 2,
            name: 'My Issue'
        }
    ];
    selectedQuery: any;
    typeColors: any;
    statusColors: any;
    user: any;
    statusDisplay: any;
    issueListClone: any = [];
    userId: any;
    isAdmin: boolean = false;
    vendorForm: FormGroup | any;
    constructor(
        private router: Router,
        private commonService: CommonService,
        private encrypDecryptService: EncryptDecryptService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.typeColors = this.commonService.typeColors;
        this.statusColors = this.commonService.statusColors;
        const encrypted = localStorage.getItem('encrypted');
        this.user = this.encrypDecryptService.getDecryptedData(encrypted);
        this.selectedQuery = this.user.roleIds.includes('ROLE_ADMIN') ? 1 : 2;
        this.userId = this.user.userId;
        this.isAdmin = this.user.roleIds.includes('ROLE_ADMIN') || this.user.roleIds.includes('ROLE_MANAGER');
        this.getUser();
        this.getIssueList();
        this.createVendorForm();
    }

    getUser() {
        this.getIssueStatus();
        this.getIssueType();
        this.commonService.getUserList().subscribe((user) => {
            if (user.status == 200) {
                const userList = user.body;
                userList.forEach((user: any) => {
                    this.displayUser[user.id] = user.username;
                });
            }
        });
    }
    getIssueList() {
        this.commonService.getIssueList().subscribe((issues: any) => {
            console.log(issues);
            this.loading = false;
            this.issueList = issues.body;
            this.issueListClone = JSON.parse(JSON.stringify(issues.body));
            this.loading = false;
            this.onQueryChange({ value: this.isAdmin ? 1 : 2 });
        });
    }
    createBug() {
        this.router.navigate(['/dashboard/uikit/create-bug']);
    }

    openAttachmentViewer(issue: any) {
        this.previewAttachment = issue.attachmentBase64;
        this.showPreview = true;
    }

    downloadAttachment() {
        if (this.previewAttachment) {
            const link = document.createElement('a');
            link.href = 'data:image/png;base64,' + this.previewAttachment;
            link.download = 'attachment.png'; // or use .jpg/.jpeg/.pdf etc.
            link.click();
        }
    }
    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    editIssue(issue: any) {
        localStorage.setItem('editIssue', JSON.stringify(issue));
        this.router.navigate(['/dashboard/uikit/create-bug'], {
            queryParams: {
                action: 'Edit'
            }
        });
    }

    getIssueStatus() {
        this.commonService.getIssueStatus().subscribe((status) => {
            if (status.status == 200) {
                if (status.body) {
                    const statusDisplay: any = {};
                    status.body.forEach((status: any) => {
                        statusDisplay[status.code] = status.name;
                    });
                    this.statusDisplay = statusDisplay;
                }
            }
        });
    }

    getIssueType() {
        this.commonService.getIssueType().subscribe((type) => {
            if (type.status == 200) {
                if (type.body) {
                    const typeComboObj: any = {};
                    type.body.forEach((type: any) => {
                        typeComboObj[type.code] = type.name;
                    });
                    this.typeComboObj = typeComboObj;
                }
            }
        });
    }

    onQueryChange(event: any) {
        this.issueList = this.issueListClone.filter((issue: any) => {
            if (event.value == 1) {
                return true;
            } else {
                return issue.assignTo == this.userId;
            }
        });
    }

   downloadMpr(data: any) {
    this.commonService.downloadDocx(data).subscribe({
        next: (blob: Blob) => {
            if (blob && blob.size > 0) {
                this.loading=false;
                this.visible=false;
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Monthly_Progress_Report(MPR)-${moment().format('MMM-YYYY')}.docx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } else {
                this.visible=false;
                this.loading=false;
                console.error('Empty file received');
            }
        },
        error: (err) => {
            this.loading=false;
            console.error('Error while downloading MPR:', err);
        }
    });
}


    showDialog() {
        this.visible = true;
    }

    createVendorForm() {
        const designationDisplay = localStorage.getItem('designationDisplay');
        let designationObj:any={};
        if (designationDisplay) {
            designationObj = JSON.parse(designationDisplay);
        }
        const today = new Date();

        const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 25);
        const endDate = today;
        this.vendorForm = this.fb.group({
            header: [`Monthly Progress Report (MPR): ${moment().format('MMM-YYYY')}`],
            name:[this.user.username],
            designation: [designationObj[this.user.designation]],
            basId: [null, Validators.required],
            vendorName: [''],
            startDate: [startDate, Validators.required],
            endDate: [endDate],
            showEndDate: [moment().format('YYYY-MM-DD')]
        });
    }

    onSubmit() {
        this.loading=true;
        if (this.vendorForm.valid) {
            this.downloadMpr(this.vendorForm.getRawValue());
        }else{
            this.loading=false;
            this.vendorForm.markAllAsTouched();
        }
    }

     get basId() {
        return this.vendorForm.get('basId');
    }
    get startDate() {
        return this.vendorForm.get('startDate');
    }

    cancel(){
        this.visible=false;
    }
}
