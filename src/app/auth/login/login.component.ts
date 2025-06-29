import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/api/common.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/authentication/auth.service';

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
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;
            const email = this.loginForm.getRawValue();
            this.authService.getLogin(email).subscribe({
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
    get email() {
        return this.loginForm.get('email');
    }

    verifyCode() {
        this.loading = true;
        const formData = this.loginForm.getRawValue();
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
                if (resp.status === 401) {
                    this.errorMessage(resp.body);
                } else {
                    this.errorMessage('Something went wrong!');
                }
            }
        });
    }

    resendCode() {
        this.otpInput = '';
        this.startCountdown();
    }

    errorMessage(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
}
