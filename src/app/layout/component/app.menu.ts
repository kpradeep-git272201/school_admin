import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { CommonService } from '../../services/api/common.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];
    constructor(private commonService: CommonService) {}
    ngOnInit() {
        this.getMasterData();
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                    { label: 'Report Bug', icon: 'pi pi-plus-circle', routerLink: '/dashboard/uikit/manage-bug' }
                ]
            },
            {
                label: 'Admin',
                items: [
                    { label: 'User', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/uikit/manage-user'] },
                    { label: 'Roles', icon: 'pi pi-fw pi-key', routerLink: ['/dashboard/uikit/roles'] },

                    { label: 'Setting', icon: 'pi pi-fw pi-cog', routerLink: ['/dashboard/uikit/setting'] }
                    // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/uikit/formlayout'] },
                    // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/dashboard/uikit/input'] },
                    // { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/dashboard/uikit/button'] },
                    // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/dashboard/uikit/table'] },
                    // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/uikit/list'] },
                    // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/dashboard/uikit/tree'] },
                    // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/uikit/panel'] },
                    // { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/dashboard/uikit/overlay'] },
                    // { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/dashboard/uikit/media'] },
                    // { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/dashboard/uikit/menu'] },
                    // { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/dashboard/uikit/message'] },
                    // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/dashboard/uikit/file'] },
                    // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/uikit/charts'] },
                    // { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/uikit/timeline'] },
                    // { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/dashboard/uikit/misc'] }
                ]
            }
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     routerLink: ['/pages'],
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/dashboard/pages/crud']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/pages/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         }
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation',
            //             icon: 'pi pi-fw pi-book',
            //             routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source',
            //             icon: 'pi pi-fw pi-github',
            //             url: 'https://github.com/primefaces/sakai-ng',
            //             target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
    getMasterData() {
        const typeCombo = localStorage.getItem('typeCombo');
        const statusCombo = localStorage.getItem('statusCombo');
        const rolesList = localStorage.getItem('rolesList');
        const designation = localStorage.getItem('designation');
        const userList = localStorage.getItem('userList');
        if (!typeCombo) {
            this.getIssueType();
        }
        if (!statusCombo) {
            this.getIssueStatus();
        }
        if (!rolesList) {
            this.getRoles();
        }
        if (!designation) {
            this.getDesigantion();
        }
        if(!userList){
            this.getUserList();
        }
    }
    getIssueType() {
        this.commonService.getIssueType().subscribe((type) => {
            if (type.status == 200) {
                const typeCombo = type.body;
                localStorage.setItem('typeCombo', JSON.stringify(typeCombo));
            }
        });
    }
    getIssueStatus() {
        this.commonService.getIssueStatus().subscribe((status) => {
            if (status.status == 200) {
                const statusCombo = status.body;
                localStorage.setItem('statusCombo', JSON.stringify(statusCombo));
            }
        });
    }

    getRoles() {
        this.commonService.getRoles().subscribe((user) => {
            if (user.status == 200) {
                const rolesList = user.body;
                localStorage.setItem('rolesList', JSON.stringify(rolesList));
                const roleDisplay: any = {};
                rolesList.forEach((role: any) => {
                    roleDisplay[role.code] = role.name;
                });
                localStorage.setItem('roleDisplay', JSON.stringify(roleDisplay));
            }
        });
    }

    getDesigantion() {
        this.commonService.getDesignation().subscribe((user) => {
            if (user.status == 200) {
                const designation = user.body;
                localStorage.setItem('designation', JSON.stringify(designation));
                const designationDisplay: any = {};
                designation.forEach((designation: any) => {
                    designationDisplay[designation.code] = designation.name;
                });
                localStorage.setItem('designationDisplay', JSON.stringify(designationDisplay));
            }
        });
    }

    getUserList() {
        this.commonService.getUserList().subscribe((user) => {
            if (user.status == 200) {
                const userList = user.body;
                localStorage.setItem('userList', JSON.stringify(userList));
                const assignToOpt:any=[];
                const requesterCombo:any=[];
                const displayUser:any={};
                userList.forEach((user: any) => {
                    assignToOpt.push({ name: user.userName, code: user.id + '' });
                    requesterCombo.push({ name: user.userName, code: user.id + '' });
                    displayUser[user.id] = user.userName;
                });
                localStorage.setItem('assignToOpt', JSON.stringify(assignToOpt));
                localStorage.setItem('requesterCombo', JSON.stringify(requesterCombo));
                localStorage.setItem('displayUser', JSON.stringify(displayUser));
            }
        });
    }
}
