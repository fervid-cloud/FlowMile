import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-generic-dialog-model',
    templateUrl: './generic-dialog-model.component.html',
    styleUrls: ['./generic-dialog-model.component.css']
})
export class GenericDialogModelComponent implements OnInit {

    @Input("title") title: string = "default title";

    @Input("content") content: string = "default content";

    @Input("cancelButtonName") cancelButtonName: string = "Cancel";

    @Input("confirmButtonName") confirmButtonName: string = "Confirm";

    @Input("position") position: string = "";

    positionMapping: { [key: string]: string } = {
        'center': 'modal-dialog-centered'
    };

    uniqueModelDialogueId: string;

    @ViewChild("modelDialogueTemplateRef")
    confirmationDialogModelTemplateRef!: ElementRef;


    confirmationDialogModel!: Modal;

    confirmCallback: Function = () => {
        console.log("default one running");
    };

    cancelCallback: Function = () => {
        this.hide()
    }

    topCancelCallback: Function = () => {
        console.log("cancel from top");
        this.hide()
    }


    constructor() {
        this.uniqueModelDialogueId = uuid();
    }


    subscribe(confirmCallbackImplementation: Function, cancelCallback?: Function, topCancelCallback?: Function) {
        console.log("subscribing");
        this.confirmCallback = confirmCallbackImplementation;
        console.log(this.confirmCallback);
        if (cancelCallback) {
            this.cancelCallback = cancelCallback;
        }

        if (topCancelCallback) {
            this.topCancelCallback = topCancelCallback
        }
    }


    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.initializeConfirmationDialogModel();
    }

    ngOnDestroy() {
        this.confirmationDialogModel.dispose();
    }

    private initializeConfirmationDialogModel() {
        // const myModalEl = <HTMLElement>document.getElementById('myModal');
        const myModalEl = this.confirmationDialogModelTemplateRef.nativeElement;
        console.log("to-do detail myModelEl is : ", myModalEl);
        this.confirmationDialogModel = new Modal(myModalEl, {
            backdrop: 'static', // means the modal will not close when clicking outside it.
            keyboard: false,
            focus: true
        });
    }


    show() {
        this.confirmationDialogModel.show();
    }

    hide() {
        console.log("hide called");
        this.confirmationDialogModel.hide();
    }


    onTopCancelClick() {
        this.topCancelCallback();
    }

    onCancelClick() {
        this.cancelCallback();
    }

    onConfirmClick() {
        this.confirmCallback();
    }



}
