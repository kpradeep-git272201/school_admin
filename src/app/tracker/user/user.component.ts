import { PrimengModule } from '../../primeng/primeng.module';
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../pages/service/product.service';
import { Table } from 'primeng/table';
import { Customer, CustomerService, Representative } from '../../pages/service/customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';
import { AuthService } from '../../services/authentication/auth.service';

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
        private authService: AuthService,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.user = this.authService.getLoggedUser();
        this.isAdmin = this.user.roleIds.includes('ROLE_ADMIN') || this.user.roleIds.includes('ROLE_MANAGER');
        const designationDisplay = localStorage.getItem('designationDisplay');
        if (designationDisplay) {
            this.designationDisplay = JSON.parse(designationDisplay);
        } else {
            const designation = localStorage.getItem('designation');
            if (designation) {
                const designationList = JSON.parse(designation);
                const designationDisplay: any = {};
                designationList.forEach((designation: any) => {
                    designationDisplay[designation.code] = designation.name;
                });
                localStorage.setItem('designationDisplay', JSON.stringify(designationDisplay));
                this.designationDisplay = designationDisplay;
            }
        }
        const roleDisplay = localStorage.getItem('roleDisplay');
        if (roleDisplay) {
            this.roleDisplay = JSON.parse(roleDisplay);
        }
        const userList = localStorage.getItem('userList');
        if (userList) {
            this.userList = JSON.parse(userList);
        }
        this.loading = false;
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
        if(this.user){

        }
        localStorage.setItem('editUser', JSON.stringify(user));
        this.router.navigate(['/dashboard/uikit/createUser'], {
            queryParams: {
                action: 'Edit'
            }
        });
    }
}
