import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-edit-to-do',
    templateUrl: './edit-to-do.component.html',
    styleUrls: ['./edit-to-do.component.css'],
    animations: [
        trigger('customLeftToRightAngularAnimation', [
            //non exising(in dom) to existing state of element
            transition('void => *', [
                animate(500, keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            //existing to non-existing state of element
            transition('* => void', [
                animate(500, keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})
export class EditToDoComponent implements OnInit {

    @ViewChild('myCustomFormLocalReference')
    formObject!: NgForm;

    invalidityReasons: string[] = [];

    validSubmitClickIndicator: boolean = false;

    successMessages: string[] = [];


    currentToDoTask: ToDoTask | null | undefined = undefined;

    private activatedRouteSubscription!: Subscription;

    private history: string[] = []
    private routerEventSubscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private taskManagementService: ToDoManagementService
    ) {

        //our choice where we want to subscribe if the observable/subject we are subscribing to exist at
        // the time of subscribing

        this.routerEventSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects)
            }
        });

    }

    ngOnInit(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((updatedParams: Params) => {
            const providedTaskId = updatedParams['taskId'];
            console.log("Provided taskId is : ", providedTaskId);
            this.currentToDoTask = this.taskManagementService.findByTaskId(providedTaskId);
        });
    }

    ngOnDestroy() {
        this.activatedRouteSubscription.unsubscribe();
        this.routerEventSubscription.unsubscribe();
    }


    ngAfterViewInit() {
        console.log(this.formObject)
    }

    onSubmit() {
        console.log("updated form is : ");
        console.log(this.formObject);
        const controls = this.formObject.form.controls;
        const fieldNames = Object.keys(controls);
        let nn = fieldNames.length;
        this.invalidityReasons = [];
        let validCounter = 0;
        for (let k = 0; k < nn; ++k) {
            const fieldName = fieldNames[k];
            const fieldDetails: AbstractControl = controls[fieldName];
            const fieldValue = <string>fieldDetails.value;
            let n = fieldValue?.length;
            if (!n || n == 0) {
                const emptyReason = `${fieldName} can't be empty`;
                this.invalidityReasons.push(emptyReason);
                continue;
            }

            if (this.isEmptyValue(fieldValue)) {
                const emptyReason = `${fieldName} can't be empty`;
                this.invalidityReasons.push(emptyReason);
                continue;
            }

            ++validCounter;
        }

        this.validSubmitClickIndicator = (validCounter == nn);
        if (this.validSubmitClickIndicator) {
            this.invalidityReasons = [];
            this.successMessages = [];
            const successMessage = "Details Updated Successfully"
            this.successMessages.push(successMessage);
            this.disableForm();
            setTimeout(() => {
                this.validSubmitClickIndicator = false;
            }, 500);
        }

    }

    onCancel() {
        this.reset();
        this.back();
    }


    private back(): void {
        console.debug("The history is : ", this.history);
        if (this.history.length > 0) {
            this.location.back()
        } else {
            // in case we opened the browser directly with this link, or new tab with this link, then try to go back
            console.debug("going back through backup as no history is there-----------------");
            this.router.navigateByUrl('/')
        }
    }


    private reset() {
        this.successMessages = [];
        this.enableForm();
        this.formObject.resetForm();
        this.validSubmitClickIndicator = false;
        this.invalidityReasons = [];
    }

    enableForm() {
        const controls = this.formObject.form.controls;
        const fieldNames = Object.keys(controls);
        fieldNames.forEach((fieldName) => {
            controls[fieldName].enable();
        });
    }


    isEmptyValue(fieldValue: string) {
        let n = fieldValue.length;
        let i = 0;
        while (i < n && fieldValue[i] == ' ') {
            ++i;
        }
        return i == n;
    }

    disableForm() {
        const controls = this.formObject.form.controls;
        const fieldNames = Object.keys(controls);
        fieldNames.forEach((fieldName) => {
            controls[fieldName].disable();
        });
    }

}
