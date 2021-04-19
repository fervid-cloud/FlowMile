import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserLoginDto } from '../dto/request/user-login-dto';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    invalidCredentialStatus = false;

    signInForm!: FormGroup;

    invalidFormSubmission: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.signInForm = new FormGroup({
            // 'email': new FormControl(null, [Validators.required, Validators.email]),
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, Validators.required)
        });
    }


    async onLoginAttempt(event: Event): Promise<void> {
        console.log(this.signInForm);
        this.invalidFormSubmission = false;
        if (!this.signInForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }
        this.signInForm.disable();
        const submitButton: HTMLElement = event.target as HTMLElement;
        submitButton.classList.add("disabled");

        const loginAttemptResult = await this.authService.logIn({
            username: this.signInForm.get("email")?.value,
            password: this.signInForm.get("password")?.value
        });

        if (loginAttemptResult) {
            console.log("login successful :)");
            this.router.navigate(["/dashboard"]);
            return;
        }
        this.invalidCredentialStatus = true;
        this.signInForm.enable();
        submitButton.classList.remove("disabled");


    }

}
