import { PrimengModule } from '../../primeng/primeng.module';
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../pages/service/product.service';
import { Table } from 'primeng/table';
import { Customer, CustomerService, Representative } from '../../pages/service/customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { AuthService } from '../../services/authentication/auth.service';
import { EncryptDecryptService } from '../../services/encrypt/encrypt-decrypt.service';

@Component({
    selector: 'app-user',
    imports: [PrimengModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class UserComponent {
    loading: boolean = true;
    representatives: Representative[] = [];
    activityValues: number[] = [0, 100];
    balanceFrozen: boolean = false;
    userList: any = [];
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt') dt!: Table;
    roleDisplay: any = {};
    designationDisplay: any = {};
    user: any;
    isAdmin: any;
    constructor(
        private router: Router,
        private encrypDecryptService: EncryptDecryptService,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        // const encrypted = localStorage.getItem('encrypted');
        // this.user = this.encrypDecryptService.getDecryptedData(encrypted);
        // this.isAdmin = this.user.roleIds.includes('ROLE_ADMIN') || this.user.roleIds.includes('ROLE_MANAGER');
        this.getDesigantion();
        this.getRoles();
        this.getUserList();
        
    }
    getUserList() {
        this.commonService.getUserList().subscribe((user) => {
            this.loading=false;
            if (user.status == 200) {
                this.userList = user.body;
            }
        });
    }
    getRoles() {
        this.commonService.getRoles().subscribe((user) => {
            if (user.status == 200) {
                const rolesList = user.body;
                const roleDisplay: any = {};
                rolesList.forEach((role: any) => {
                    roleDisplay[role.code] = role.name;
                });
                this.roleDisplay = roleDisplay;
            }
        });
    }
    getDesigantion() {
        this.commonService.getDesignation().subscribe((user) => {
            if (user.status == 200) {
                const designation = user.body;
                const designationDisplay: any = {};
                designation.forEach((designation: any) => {
                    designationDisplay[designation.code] = designation.name;
                });
                this.designationDisplay = designationDisplay;
            }
        });
    }
    createUser() {
        this.router.navigate(['/dashboard/uikit/createUser']);
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    editUser(user: any) {
        if (this.user) {
        }
        localStorage.setItem('editUser', JSON.stringify(user));
        this.router.navigate(['/dashboard/uikit/createUser'], {
            queryParams: {
                action: 'Edit'
            }
        });
    }
}
