import { PrimengModule } from '../../primeng/primeng.module';
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../pages/service/product.service';
import { Table } from 'primeng/table';
import { Customer, CustomerService, Representative } from '../../pages/service/customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../services/common.service';

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
    constructor(
        private router: Router,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        this.commonService.getUserList().subscribe((user) => {
          if(user.status==200){
            this.userList = user.body;
          }
          this.loading = false;
          
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
        this.router.navigate(['/dashboard/uikit/createUser']);
    }
}
