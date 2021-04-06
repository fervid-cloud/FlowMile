import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


    invalidCredentialStatus = false;

    signInForm!: FormGroup;

    invalidFormSubmission: boolean = false;


    constructor() { }

    ngOnInit(): void {
        this.signInForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    }

    onLoginAttempt(event: Event): void {
        console.log(this.signInForm);
        this.invalidFormSubmission = false;
        if (!this.signInForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }
        this.signInForm.disable();
        const submitButton: HTMLElement = event.target as HTMLElement;
        submitButton.classList.add("disabled");

        setTimeout(() => {
            this.signInForm.enable();
            submitButton.classList.remove("disabled");

        }, 2000);

    }

}
