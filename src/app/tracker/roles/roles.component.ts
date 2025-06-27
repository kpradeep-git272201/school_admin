import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { Router } from '@angular/router';
import { CommonService } from '../../services/api/common.service';

@Component({
    selector: 'app-roles',
    imports: [PrimengModule],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss'
})
export class RolesComponent {
    loading: boolean = true;
    rolesList: any = [];
    roleDisplay: any={};
    constructor(
        private router: Router,
        private commonService: CommonService
    ) {}

    ngOnInit() {
        const roleDisplay = localStorage.getItem('roleDisplay');
        if(roleDisplay){
            this.roleDisplay=JSON.parse(roleDisplay);
        }
        const rolesList = localStorage.getItem('rolesList');
        if(rolesList){
            this.rolesList=JSON.parse(rolesList);
        }
        this.loading=false;

    }
}
