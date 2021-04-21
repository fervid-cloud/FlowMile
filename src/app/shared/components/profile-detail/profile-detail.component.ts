import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: [ './profile-detail.component.css' ]
})
export class ProfileDetailComponent implements OnInit {

    profileEditForm!: FormGroup;
    invalidFormSubmission: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        this.profileEditForm = new FormGroup({
            'email': new FormControl(null, [ Validators.required, Validators.email ]),
            'password': new FormControl(null, Validators.required)
        });
    }


    onEditAttempt($event: MouseEvent): void {

    }
}
