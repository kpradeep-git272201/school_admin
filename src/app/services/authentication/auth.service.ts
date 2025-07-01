import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, ObservableInput, of, throwError } from 'rxjs';
import { AppConfig } from '../../config/app.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();

    handleError!: (err: any, caught: Observable<any>) => ObservableInput<any>;
    loggedIn: boolean | undefined;
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private http: HttpClient
    ) {}

    ngOnInit() {
        if (this.isBrowser()) {
            if (localStorage.getItem('isLoggedIn') === 'true') this.isLoggedInSubject.next(true);
        }
    }

    getLoggedUser(){
      if (this.isBrowser()) {
        const user = localStorage.getItem('user');
        if(user){
          return JSON.parse(user);
        }
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
    isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }
    isAuthenticated(): boolean {
        if (this.isBrowser()) {
            const token = localStorage.getItem('token');
            return token ? true : false;
        }
        return false;
    }

    getLogin(data: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.generateOtp}`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.http.post(url, data, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

    veryfyOtp(userData: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.verifyOtp}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json');
        return this.request('POST', url, { body: userData, headers: headers, reportProgress: false, observe: 'response' }).pipe(
            map((resp) => {
                this.loggedIn = true;
                return resp;
            }),
            catchError((error) => {
                this.loggedIn = false;
                return of(false);
            })
        );
    }
    verifyTpin(userData: any) {
        const url = `${AppConfig.BASE_API}${AppConfig.endpointPath.verifyTpin}`;
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json');
        return this.request('POST', url, { body: userData, headers: headers, reportProgress: false, observe: 'response' }).pipe(
            map((resp) => {
                this.loggedIn = true;
                return resp;
            }),
            catchError((error) => {
                this.loggedIn = false;
                return of(false);
            })
        );
    }
    logout(): void {
        if (this.isBrowser()) {
            localStorage.removeItem('loggedUser');
            localStorage.removeItem('token');
            this.isLoggedInSubject.next(false);
        }
    }

}
