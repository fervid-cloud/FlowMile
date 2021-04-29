import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalUser } from '../../model/LocalUser';
import { AuthService } from '../../../auth/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: [ './profile-detail.component.css' ]
})
export class ProfileDetailComponent implements OnInit {

    profileEditForm!: FormGroup;

    currentUserDetail!: LocalUser;

    invalidFormSubmission: boolean = false;

    profileEditMode: boolean = false;

    constructor(
        private authService: AuthService,
        private toastrService: ToastrService
    ) {
        this.currentUserDetail = this.authService.getLocalUserInfo();
    }

    ngOnInit(): void {
        this.profileEditForm = new FormGroup({
            firstName: new FormControl(this.currentUserDetail.firstName, Validators.required),
            lastName: new FormControl(this.currentUserDetail.lastName, Validators.required),
            // email: new FormControl(null, [Validators.required, Validators.email])
        });
    }


    onEditAttempt($event: MouseEvent): void {
        this.profileEditMode = true;

    }

    async onSaveAttempt(event: MouseEvent) {

        this.invalidFormSubmission = false;
        if (!this.profileEditForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }

        this.profileEditForm.disable();
        const submitButton: HTMLElement = event.target as HTMLElement;
        submitButton.classList.add("buttonDisable");

        this.currentUserDetail = await this.authService.editUserInfo({
            firstName: this.profileEditForm.get("firstName")?.value,
            lastName: this.profileEditForm.get("lastName")?.value
        });

        this.toastrService.success("Profile updated successfully", "Success", {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
        });

        setTimeout(() => {
            submitButton.classList.remove("buttonDisable");
            this.profileEditMode = false;
            this.profileEditForm.enable();
        }, 2000);
    }
}
