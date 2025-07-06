import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/api/common.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/authentication/auth.service';
import { AppConfig } from '../../config/app.config';

@Component({
    selector: 'app-login',
    imports: [PrimengModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [MessageService]
})
export class LoginComponent {
    timer: number = 300; // 5 minutes in seconds
    timerDisplay: string = '05:00';
    resendAvailable: boolean = false;
    loading: boolean = false;
    private countdownInterval: any;
    loginForm: FormGroup | any;
    loginTemplate: string = 'Login';
    otpInput: string = '';
    isExistEmail: boolean | undefined;
    buttonName: string = 'Submit';
    signupForm: FormGroup | any;
    appVersion: any;
    lastUpdated:any;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            loginMethod: ['tpin']
        });
    }

    ngOnInit() {
        this.appVersion=AppConfig.APP_VERSION;
        this.lastUpdated=AppConfig.LAST_UPDATED;
    }
    onChecked(event: any, method: any) {
        this.buttonName = method == 'tpin' ? 'Submit' : 'Send Verification Code';
        this.loginForm.controls['loginMethod'].setValue(method);
    }
    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;
            const data = this.loginForm.getRawValue();
            if (this.loginForm.getRawValue().loginMethod == 'tpin') {
                this.loginTemplate = 't-pin';
                this.loading = false;
            } else {
                this.authService.getLogin(data).subscribe({
                    next: (res) => {
                        this.loading = false;
                        this.isExistEmail = false;
                        this.startCountdown();
                        this.loginTemplate = 'Otp';
                    },
                    error: (err) => {
                        this.loading = false;
                        if (err.status === 400) {
                            const msg = err.error?.message || 'Email already exists';
                            this.isExistEmail = true;
                        } else {
                            this.errorMessage('Something went wrong!');
                        }
                    }
                });
            }
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    startCountdown() {
        this.resendAvailable = false;
        this.timer = 300; // Reset timer to 2 minutes
        this.countdownInterval = setInterval(() => {
            if (this.timer > 0) {
                this.timer--;
                this.updateTimerDisplay();
            } else {
                this.stopCountdown();
                this.resendAvailable = true; // Enable "Resend OTP" option
            }
        }, 1000);
    }
    updateTimerDisplay() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    stopCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }
   

    verifyCode() {
        this.loading = true;
        const formData = this.loginForm.getRawValue();
        if (formData.loginMethod == 'tpin') {
            const data = {
                email: formData.email,
                tPin: this.otpInput
            };
            this.authService.verifyTpin(data).subscribe((resp: any) => {
                if (resp?.status == 200) {
                    this.loading = false;
                    localStorage.setItem('user', JSON.stringify(resp.body));
                    const token = resp.headers.get('Authorization');
                    localStorage.setItem('token', token);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.loading = false;
                    if (resp?.status === 401) {
                        this.errorMessage(resp.body);
                    } else if (resp == false) {
                        this.errorMessage('Verification code not matched');
                    } else {
                        this.errorMessage('Something went wrong!');
                    }
                }
            });
        } else {
            const data = {
                email: formData.email,
                otp: this.otpInput
            };
            this.authService.veryfyOtp(data).subscribe((resp: any) => {
                if (resp?.status == 200) {
                    this.loading = false;
                    localStorage.setItem('user', JSON.stringify(resp.body));
                    const token = resp.headers.get('Authorization');
                    localStorage.setItem('token', token);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.loading = false;
                    if (resp?.status === 401) {
                        this.errorMessage(resp.body);
                    } else if (resp == false) {
                        this.errorMessage('Verification code not matched');
                    } else {
                        this.errorMessage('Something went wrong!');
                    }
                }
            });
        }
    }

    resendCode() {
        this.otpInput = '';
        this.startCountdown();
    }

    errorMessage(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
    sucessMessage(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }
    getSignUp() {
        this.loginTemplate = 'signUp';
        this.createSignUpForm();
    }

    createSignUpForm() {
        this.signupForm = this.fb.group({
            username: ['', Validators.required],
            designation: ['SD', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            isActive: ['Y'],
            roleIds: [['ROLE_USER'], Validators.required],
            tPin: [null, [Validators.required, Validators.min(10000)]]
        });
    }

    signUp() {
        if (this.signupForm.valid) {
            this.loading = true;
            const user = this.signupForm.getRawValue();
            this.authService.signUp(user).subscribe({
                next: (res) => {
                    this.loading = false;
                    this.sucessMessage('User created! Now you can login email and t-pin');
                    this.loginTemplate = 'Login';
                },
                error: (err) => {
                    this.loading = false;
                    if (err.status === 409) {
                        const msg = err.error?.message || 'Email already exists';
                        this.errorMessage(msg);
                    } else {
                        this.errorMessage('Something went wrong');
                    }
                }
            });
        } else {
            this.signupForm.markAllAsTouched();
        }
    }
    get username() {
        return this.signupForm.get('username');
    }

    get designation() {
        return this.signupForm.get('designation');
    }

    get email() {
        if(this.loginTemplate=='signUp'){
            return this.signupForm.get('email');
        }
        return this.loginForm.get('email');
    }
   
    get tPin() {
        return this.signupForm.get('tPin');
    }
}
