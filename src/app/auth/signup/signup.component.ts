import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ './signup.component.css' ]
})
export class SignupComponent implements OnInit {


    invalidCredentialStatus = false;

    registerForm!: FormGroup;

    invalidFormSubmission: boolean = false;


    constructor(
        private authService: AuthService,
        private router: Router,
        private toastrService: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [ Validators.required, Validators.email ]),
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        }, this.passwordMatchingValidators);
    }


    passwordMatchingValidators = (control: AbstractControl): { [p: string]: boolean } | null => {

        const newPassword = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        // if no values, valid
        if (!newPassword?.value || !confirmPassword?.value) {
            return null;
        }
        // if values match return null, else 'mismatchedPasswords:true'
        return newPassword.value === confirmPassword.value ? null : {passwordsMismatch: true};
    };


    async onRegisterAttempt(event: Event): Promise<void> {
        console.log(this.registerForm);
        this.invalidFormSubmission = false;
        if (!this.registerForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }
        this.registerForm.disable();
        const submitButton: HTMLElement = event.target as HTMLElement;
        submitButton.classList.add('disabled');

        const registrationAttemptResult = await this.authService.registerUser({
            firstName: this.registerForm.get('firstName')?.value,
            lastName: this.registerForm.get('lastName')?.value,
            email: this.registerForm.get('email')?.value,
            password: this.registerForm.get('password')?.value
        });

        if (registrationAttemptResult) {
            console.log('registration successful :)');
            console.log('routing to login');
            const showTime = 2000;
            this.toastrService.success('you have registered successfully', 'Registered', {
                timeOut: showTime,
                positionClass: 'toast-bottom-right',
            });

            setTimeout(() => {
                this.toastrService.success('Redirecting to login', 'Registered', {
                    timeOut: showTime + 500,
                    progressBar: true,
                    positionClass: 'toast-top-right',
                });
            }, showTime + 200);

            setTimeout(() => {
                this.router.navigate([ '/login' ]);
            }, 3 * showTime);
            return;
        }

        this.registerForm.reset();
        submitButton.classList.remove('disabled');
    }

}
