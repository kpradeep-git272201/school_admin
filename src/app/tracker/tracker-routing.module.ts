import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBugComponent } from './manage-bug/manage-bug.component';

const routes: Routes = [

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerRoutingModule { }
