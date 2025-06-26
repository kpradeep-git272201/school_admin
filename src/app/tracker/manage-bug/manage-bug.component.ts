import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrimengModule } from '../../primeng/primeng.module';
import { Product, ProductService } from '../../pages/service/product.service';
import { Table } from 'primeng/table';
import { Customer, CustomerService, Representative } from '../../pages/service/customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../services/common.service';
import { OverlayPanel } from 'primeng/overlaypanel';

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
    customers1: Customer[] = [];
    loading: boolean = true;
    representatives: Representative[] = [];
    activityValues: number[] = [0, 100];
    balanceFrozen: boolean = false;
    reportList: Customer[] = [];
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt') dt!: Table;
    showPreview = false;
    previewAttachment: string | null = null;
    displayUser: any = {};
    typeComboObj: any = { '1': 'Bug', '2': 'Issue', '3': 'Feature', '4': 'Enhancement' };
    statusComboObj: any = {
        '1': 'Pending',
        '2': 'In Progress',
        '3': 'Completed',
        '4': 'Rejected',
        '5': 'Resolved'
    };

    typeColors: any;
    statusColors: any;
    constructor(
        private router: Router,
        private customerService: CustomerService,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.typeColors = this.commonService.typeColors;
        this.statusColors = this.commonService.statusColors;
        this.getUser();
        this.getIssueList();
    }


    getUser() {
        this.commonService.getUserList().subscribe((user) => {
            if (user.status == 200) {
                const userList = user.body;
                userList.forEach((user: any) => {
                    this.displayUser[user.id] = user.userName;
                });
            }
        });
    }
    getIssueList() {
        this.commonService.getIssueList().subscribe((issues) => {
            this.reportList = issues.body;
            this.loading = false;
        });
    }
    createBug() {
        this.router.navigate(['/dashboard/uikit/create-bug']);
    }

    openAttachmentViewer(report: any) {
        this.previewAttachment = report.attachmentBase64;
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
        this.router.navigate(['/dashboard/uikit/create-bug'], {
            queryParams: {
                issue: JSON.stringify(issue)
            }
        });
    }
}
