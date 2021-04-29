import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: [ './change-password.component.css' ]
})
export class ChangePasswordComponent implements OnInit {

    changePasswordEditForm!: FormGroup;

    invalidFormSubmission: boolean = false;

    constructor(
        private authService: AuthService,
        private toastrService: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.changePasswordEditForm = new FormGroup({
            curPassword: new FormControl(null, Validators.required),
            newPassword: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        }, this.passwordMatchingValidators);
    }


    passwordMatchingValidators = (control: AbstractControl): { [p: string]: boolean } | null => {

        const newPassword = control.get('newPassword');
        const confirmPassword = control.get('confirmPassword');
        // if no values, valid
        if (!newPassword?.value || !confirmPassword?.value) {
            return null;
        }
        // if values match return null, else 'mismatchedPasswords:true'
        return newPassword.value === confirmPassword.value ? null : { passwordsMismatch: true };
    }



    async onUpdatePasswordAction(event: MouseEvent): Promise<void> {
        this.invalidFormSubmission = false;
        if (!this.changePasswordEditForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }

        this.changePasswordEditForm.disable();
        const submitButton: HTMLElement = event.target as HTMLElement;
        submitButton.classList.add("buttonDisable");

        const passwordUpdated: boolean = await this.authService.changePassword({
            curPassword: this.changePasswordEditForm.get("curPassword")?.value,
            newPassword: this.changePasswordEditForm.get("newPassword")?.value,
            confirmPassword: this.changePasswordEditForm.get("confirmPassword")?.value,
        });

        this.toastrService.success("redirecting to login Page", "Password Updated", {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
        });

        setTimeout(() => {
            submitButton.classList.remove("buttonDisable");
            this.changePasswordEditForm.enable();
        }, 2000);
    }

}
