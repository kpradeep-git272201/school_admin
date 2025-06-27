import { PrimengModule } from '../../primeng/primeng.module';
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../pages/service/product.service';
import { Table } from 'primeng/table';
import { Customer, CustomerService, Representative } from '../../pages/service/customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../services/api/common.service';

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
    roleDisplay: any={};
    designationDisplay: any={};
    constructor(
        private router: Router,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        const designationDisplay = localStorage.getItem('designationDisplay');
        if(designationDisplay){
            this.designationDisplay=JSON.parse(designationDisplay);
        }
        const roleDisplay = localStorage.getItem('roleDisplay');
        if(roleDisplay){
            this.roleDisplay=JSON.parse(roleDisplay);
        }
        const userList = localStorage.getItem('userList');
          if (userList) {
            this.userList = JSON.parse(userList);
        }
        this.loading=false;
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
        this.router.navigate(['/dashboard/uikit/createUser']);
    }
}
