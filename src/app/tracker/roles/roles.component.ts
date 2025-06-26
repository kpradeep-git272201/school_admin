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
  loading:boolean = true;
  rolesList:any=[];
  constructor(   private router: Router,
          private commonService: CommonService){

  }

  ngOnInit(){
     this.commonService.getRoles().subscribe((user) => {
          if(user.status==200){
            this.rolesList = user.body;
          }
          this.loading = false;
        });
  }
}
