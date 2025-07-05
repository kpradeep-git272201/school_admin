import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, ObservableInput, of, throwError } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    handleError!: (err: any, caught: Observable<any>) => ObservableInput<any>;
    typeColors: any = {
        BUG: '#e74c3c', // Bug
        ISSUE: '#e67e22', // Issue
        FEATURE: '#27ae60', // Feature
        ENHANCEMENT: '#3498db' // Enhancement
    };
    statusColors: any = {
        PENDING: '#f1c40f', // Pending
        IN_PROGRESS: '#2980b9', // In Progress
        COMPLETED: '#2ecc71', // Completed
        REJECTED: '#c0392b', // Rejected
        RESOLVED: '#8e44ad' // Resolved
    };
    token: string | null | undefined;
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private http: HttpClient
    ) {
        if (this.isBrowser()) {
            this.token = localStorage.getItem('token');
        }
    }
    isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }
    getReportBugs() {
        return Promise.resolve(this.getData());
    }

    getData() {
        return [
            {
                issueId: 'ISSUE-101',
                projectCode: 'PRJ-001',
                title: 'Login not working',
                description: 'Users are unable to log in with correct credentials.',
                requester: 'Ankit Sharma',
                assignTo: 'Rohit Verma',
                startDate: '2025-06-01',
                endDate: '2025-06-03',
                type: 'Bug',
                status: 'Open',
                attachment: 'screenshot1.png',
                remarks: 'Urgent fix required'
            },
            {
                issueId: 'ISSUE-102',
                projectCode: 'PRJ-001',
                title: 'UI misalignment on dashboard',
                description: 'Cards overlap on smaller screens.',
                requester: 'Megha Joshi',
                assignTo: 'Amit Sinha',
                startDate: '2025-06-02',
                endDate: '2025-06-05',
                type: 'UI Issue',
                status: 'In Progress',
                attachment: 'ui_bug.png',
                remarks: ''
            },
            {
                issueId: 'ISSUE-103',
                projectCode: 'PRJ-002',
                title: 'Export to Excel failing',
                description: 'Export function returns 500 error.',
                requester: 'Ravi Kumar',
                assignTo: 'Pooja Mehra',
                startDate: '2025-06-03',
                endDate: '2025-06-06',
                type: 'Bug',
                status: 'Open',
                attachment: 'log.txt',
                remarks: 'Error traced in export service'
            },
            {
                issueId: 'ISSUE-104',
                projectCode: 'PRJ-003',
                title: 'Performance lag',
                description: 'Dashboard takes 10+ seconds to load.',
                requester: 'Sneha Rao',
                assignTo: 'Anuj Kumar',
                startDate: '2025-06-04',
                endDate: '2025-06-10',
                type: 'Enhancement',
                status: 'Open',
                attachment: '',
                remarks: 'Optimize database queries'
            },
            {
                issueId: 'ISSUE-105',
                projectCode: 'PRJ-002',
                title: 'Missing validation in form',
                description: 'Form accepts empty email field.',
                requester: 'Vikram Singh',
                assignTo: 'Deepika Jain',
                startDate: '2025-06-05',
                endDate: '2025-06-07',
                type: 'Bug',
                status: 'Closed',
                attachment: '',
                remarks: 'Validation added'
            },
            {
                issueId: 'ISSUE-106',
                projectCode: 'PRJ-001',
                title: 'Add dark mode support',
                description: 'User requested dark mode feature.',
                requester: 'Alok Mishra',
                assignTo: 'Reema Das',
                startDate: '2025-06-06',
                endDate: '2025-06-15',
                type: 'Feature Request',
                status: 'Open',
                attachment: '',
                remarks: 'UI team to review'
            },
            {
                issueId: 'ISSUE-107',
                projectCode: 'PRJ-003',
                title: 'Search not returning results',
                description: 'Search function not returning relevant data.',
                requester: 'Nikita Jha',
                assignTo: 'Rahul Roy',
                startDate: '2025-06-07',
                endDate: '2025-06-10',
                type: 'Bug',
                status: 'In Progress',
                attachment: 'search_error.png',
                remarks: 'Elasticsearch logs needed'
            },
            {
                issueId: 'ISSUE-108',
                projectCode: 'PRJ-004',
                title: 'Add project summary report',
                description: 'Need a new report showing weekly project summary.',
                requester: 'Ramesh Yadav',
                assignTo: 'Kavita Sen',
                startDate: '2025-06-08',
                endDate: '2025-06-14',
                type: 'Feature Request',
                status: 'Open',
                attachment: '',
                remarks: ''
            },
            {
                issueId: 'ISSUE-109',
                projectCode: 'PRJ-004',
                title: 'Crash on clicking save',
                description: 'App crashes when saving a large record.',
                requester: 'Swati Nair',
                assignTo: 'Manish Tiwari',
                startDate: '2025-06-09',
                endDate: '2025-06-12',
                type: 'Bug',
                status: 'Resolved',
                attachment: 'crash_dump.log',
                remarks: 'Memory issue fixed'
            },
            {
                issueId: 'ISSUE-110',
                projectCode: 'PRJ-005',
                title: 'Notification delay',
                description: 'Notifications sent with 5 mins delay.',
                requester: 'Ajay Bansal',
                assignTo: 'Sonia Paul',
                startDate: '2025-06-10',
                endDate: '2025-06-13',
                type: 'Bug',
                status: 'Open',
                attachment: '',
                remarks: ''
            },
            {
                issueId: 'ISSUE-111',
                projectCode: 'PRJ-001',
                title: 'Translation issues',
                description: 'Hindi translation missing on some pages.',
                requester: 'Priya Kaur',
                assignTo: 'Rajat Gupta',
                startDate: '2025-06-11',
                endDate: '2025-06-14',
                type: 'UI Issue',
                status: 'In Progress',
                attachment: 'screenshot_translation.png',
                remarks: ''
            },
            {
                issueId: 'ISSUE-112',
                projectCode: 'PRJ-002',
                title: 'Email not sent',
                description: 'User not receiving confirmation email.',
                requester: 'Neha Agarwal',
                assignTo: 'Aditya Kapoor',
                startDate: '2025-06-11',
                endDate: '2025-06-12',
                type: 'Bug',
                status: 'Open',
                attachment: '',
                remarks: 'Check SMTP logs'
            },
            {
                issueId: 'ISSUE-113',
                projectCode: 'PRJ-003',
                title: 'Update password policy',
                description: 'Minimum password length should be 10.',
                requester: 'Tarun Joshi',
                assignTo: 'Simran Chawla',
                startDate: '2025-06-12',
                endDate: '2025-06-16',
                type: 'Enhancement',
                status: 'Closed',
                attachment: '',
                remarks: 'Policy updated in DB'
            },
            {
                issueId: 'ISSUE-114',
                projectCode: 'PRJ-005',
                title: 'Broken image links',
                description: 'Some images not loading in help section.',
                requester: 'Anjali Kumari',
                assignTo: 'Suresh Pandey',
                startDate: '2025-06-13',
                endDate: '2025-06-15',
                type: 'UI Issue',
                status: 'Resolved',
                attachment: 'image_links.txt',
                remarks: 'Static path corrected'
            },
            {
                issueId: 'ISSUE-115',
                projectCode: 'PRJ-002',
                title: 'Database backup failed',
                description: 'Scheduled backup failed last night.',
                requester: 'Rahul Desai',
                assignTo: 'Bhavna Kapoor',
                startDate: '2025-06-14',
                endDate: '2025-06-15',
                type: 'Bug',
                status: 'Open',
                attachment: 'backup_log.log',
                remarks: ''
            },
            {
                issueId: 'ISSUE-116',
                projectCode: 'PRJ-001',
                title: 'Allow CSV import',
                description: 'Users want to import tasks via CSV.',
                requester: 'Sunil Rao',
                assignTo: 'Kriti Sen',
                startDate: '2025-06-15',
                endDate: '2025-06-20',
                type: 'Feature Request',
                status: 'In Progress',
                attachment: '',
                remarks: ''
            },
            {
                issueId: 'ISSUE-117',
                projectCode: 'PRJ-003',
                title: 'Session timeout too short',
                description: 'Users logged out after 5 mins of inactivity.',
                requester: 'Nishant Bhatia',
                assignTo: 'Yamini Reddy',
                startDate: '2025-06-16',
                endDate: '2025-06-17',
                type: 'Enhancement',
                status: 'Closed',
                attachment: '',
                remarks: 'Session extended to 30 mins'
            },
            {
                issueId: 'ISSUE-118',
                projectCode: 'PRJ-005',
                title: 'Broken link in footer',
                description: 'Support page link is incorrect.',
                requester: 'Bhaskar Sen',
                assignTo: 'Payal Mehta',
                startDate: '2025-06-17',
                endDate: '2025-06-18',
                type: 'UI Issue',
                status: 'Resolved',
                attachment: 'footer_bug.png',
                remarks: 'Fixed in footer component'
            },
            {
                issueId: 'ISSUE-119',
                projectCode: 'PRJ-004',
                title: 'User roles not assigned',
                description: 'New users not getting default roles.',
                requester: 'Karan Oberoi',
                assignTo: 'Nisha Rawat',
                startDate: '2025-06-18',
                endDate: '2025-06-19',
                type: 'Bug',
                status: 'Open',
                attachment: '',
                remarks: 'Check role mapping logic'
            },
            {
                issueId: 'ISSUE-120',
                projectCode: 'PRJ-005',
                title: 'App icon missing on Android',
                description: 'No launcher icon shown after installation.',
                requester: 'Divya Thakur',
                assignTo: 'Ashok Iyer',
                startDate: '2025-06-19',
                endDate: '2025-06-20',
                type: 'Bug',
                status: 'Resolved',
                attachment: 'apk_manifest.xml',
                remarks: 'Icon added to manifest'
            }
        ];
    }

    getUserListJson() {
        return Promise.resolve([
            {
                id: 1,
                username: 'John Doe',
                designation: 'Developer',
                email: 'john@example.com',
                isActive: true
            }
        ]);
    }

    /** ********************************* */

    getClearLocalStorage() {
        if (this.isBrowser()) {
            localStorage.removeItem('roleDisplay');
            localStorage.removeItem('rolesList');
            localStorage.removeItem('typeCombo');
            localStorage.removeItem('statusCombo');
            localStorage.removeItem('designationDisplay');
            localStorage.removeItem('userList');
            localStorage.removeItem('assignToOpt');
            localStorage.removeItem('requesterCombo');
            localStorage.removeItem('displayUser');
            localStorage.getItem('user');
            localStorage.getItem('token');
        }
    }

    public request(
        method: string,
        url: string,
        options: {
            body?: any;
            headers?: any;
            responseType?: any;
            observe?: any;
            reportProgress?: boolean;
        }
    ): Observable<any> {
        return this.http.request(method, url, options).pipe(catchError(this.handleError));
    }

    getUserList() {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.user}`;
        console.log(url);
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', `${this.token}`);
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    getRoles() {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.roles}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', `${this.token}`);
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    createRoles(role: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.roles}`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.request('POST', url, {
            body: role,
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    getIssueType() {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issueType}`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    addIssueType(issueType: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issueType}`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.request('POST', url, {
            body: issueType,
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    getIssueStatus() {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issueStatus}`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    addStatus(status: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issueStatus}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', `${this.token}`);
        return this.request('POST', url, {
            body: status,
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    getDesignation() {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.designation}`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    addDesignation(designation: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.designation}`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.request('POST', url, {
            body: designation,
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    createUser(data: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.user}`;
        const headers = new HttpHeaders().set('Authorization', `${this.token}`);
        return this.http.post(url, data, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

    updateUser(userId: any, data: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.user}/${userId}`;
        const headers = new HttpHeaders().set('Authorization', `${this.token}`);
        return this.http.patch(url, data, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }
    addIssue(formData: FormData) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issues}/addIssue`;
        const headers = new HttpHeaders().set('Authorization', `${this.token}`);

        return this.request('POST', url, {
            body: formData,
            headers: headers,
            reportProgress: true,
            observe: 'response'
        }).pipe(
            map((resp) => resp),
            catchError((error) => of(error))
        );
    }
    updatedIssue(formData: FormData, issueId: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issues}/${issueId}`;
        const headers = new HttpHeaders().set('Authorization', `${this.token}`);

        return this.request('PUT', url, {
            body: formData,
            headers: headers,
            reportProgress: true,
            observe: 'response'
        }).pipe(
            map((resp) => resp),
            catchError((error) => of(error))
        );
    }
    getIssueList() {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issues}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', `${this.token}`);
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }

    getIssueById(issueId: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.issues}/${issueId}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', `${this.token}`);
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
    getStatusCount() {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.statusCount}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', `${this.token}`);
        return this.request('GET', url, {
            headers: headers,
            reportProgress: false,
            observe: 'response'
        }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }

    downloadDocx(data: any): Observable<Blob> {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.downloadDoc}`;
        const headers = new HttpHeaders().set('Authorization', `${this.token}`);
        return this.http.post<Blob>(url, data, {
            headers: headers,
            responseType: 'blob' as 'json'
        });
    }

    sendEmail(mailBody: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.sendMail}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json').set('Authorization', `${this.token}`);
        return this.request('POST', url, { body: mailBody, headers: headers, reportProgress: false, observe: 'response' }).pipe(
            map((resp) => {
                return resp;
            }),
            catchError((error) => {
                return of(false);
            })
        );
    }
}
