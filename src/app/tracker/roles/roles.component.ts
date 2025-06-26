import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-roles',
    imports: [PrimengModule],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss'
})
export class RolesComponent {
    loading: boolean = true;
    rolesList: any = [];
    constructor(
        private router: Router,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        const rolesList = localStorage.getItem('rolesList');
        if(rolesList){
            this.rolesList=JSON.parse(rolesList);
        }
        this.loading=false;

    }
}
