import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: [ './change-password.component.css' ]
})
export class ChangePasswordComponent implements OnInit {

    changePasswordEditForm!: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.initializeChangePasswordEditForm();
    }

    private initializeChangePasswordEditForm(): void {
        this.changePasswordEditForm = new FormGroup({
            'oldPasword': new FormControl(null, [ Validators.required, Validators.email ]),
            'newPassword': new FormControl(null, Validators.required),
            'confirmPassword': new FormControl(null, Validators.required)
        });
    }

    onUpdatePasswordAction($event: MouseEvent): void {

    }
}
