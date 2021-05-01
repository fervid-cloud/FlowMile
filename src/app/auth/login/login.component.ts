import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    invalidCredentialStatus = false;

    signInForm!: FormGroup;

    invalidFormSubmission: boolean = false;

    @ViewChild("submitButtonTemplateRef") loginSubmit!: ElementRef;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    async ngOnInit(): Promise<void> {
        this.signInForm = new FormGroup({
            // 'email': new FormControl(null, [Validators.required, Validators.email]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required)
        });
        // this.routeIfLoggedIn();
    }


    async onLoginAttempt(event: Event): Promise<void> {
        // not using event and using ngModel because of edge case of submitting the form by pressing enter
        this.invalidFormSubmission = false;
        if (!this.signInForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }
        this.signInForm.disable();
        console.log("login submit button is : ", this.loginSubmit);
        const submitButton = this.loginSubmit.nativeElement;
        submitButton.classList.add("disabled");
        const loginAttemptResult = await this.authService.logIn({
            username: this.signInForm.get("email")?.value,
            password: this.signInForm.get("password")?.value
        });

        console.log("login attempt was : ", loginAttemptResult);

        if (loginAttemptResult) {
            console.log("login successful :)");
            console.log("routing to dashboard");
            await this.router.navigate([ "/user/dashboard" ]);
            return;
        }
        this.invalidCredentialStatus = true;
        this.signInForm.enable();
        submitButton.classList.remove("disabled");


    }

    private routeIfLoggedIn(): void {
        if(this.authService.isAuthenticated()) {
            this.router.navigate([ "/user/dashboard" ]);
        }
    }

}
