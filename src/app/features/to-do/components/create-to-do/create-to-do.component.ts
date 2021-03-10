import { animate, keyframes, sequence, state, style, transition, trigger } from '@angular/animations';
import { isEmptyExpression } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NgForm } from '@angular/forms';

@Component({
    selector: 'app-create-to-do',
    templateUrl: './create-to-do.component.html',
    styleUrls: ['./create-to-do.component.css'],
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
export class CreateToDoComponent implements OnInit {

    @ViewChild('myCustomFormLocalReference')
    formObject!: NgForm;

    invalidityReasons: string[] = [];

    validSubmitClickIndicator: boolean = false;

    successMessages: string[] = [];

    constructor() { }

    ngOnInit(): void {
        // if we have to use viewChild decorated object here, decllare it like this
        // @ViewChild('elementLocalRefereneName', { static: true }) element: ElementRef;
        // { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild()(and also
        // @ContentChild() which you'll learn about later) IF you plan on accessing the selected element inside of ngOnInit().
        // If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!
        // Angular 9 +, you only need to add { static: true } (if needed) but not { static: false }.
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
            const successMessage = "Details Submitted Successfully"
            this.successMessages.push(successMessage);
            this.disableForm();
            setTimeout(() => {
                this.validSubmitClickIndicator = false;
            }, 500);
        }

    }


    onReset() {
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
