import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Modal from 'bootstrap/js/dist/modal';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { TaskCategory } from '../../model/task-category';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';

@Component({
    selector: 'app-category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

    @Input('currentCategoryDetail') currentCategory!: TaskCategory;

    @ViewChild('deleteConfirmationDialog')
    deleteConfirmationDialogModelTemplateRef!: ElementRef;

    @ViewChild('saveConfirmationDialog')
    saveConfirmationDialogModelTemplateRef!: ElementRef;

    @ViewChild('crudOperationsParentButton')
    crudOperationsParentButtonTemplateRef!: ElementRef;

    private deleteConfirmationDialogModel!: Modal;

    private saveConfirmationDialogModel!: Modal;

    private todoManagementServiceSubscription!: Subscription;

    categoryEditMode = false;

    categoryEditForm!: FormGroup;

    showSpinner = false;

    invalidFormSubmission: boolean = false;


    editFormSubscription!: Subscription;

    constructor(
        private taskManagementService: TaskManagementService,
        private utilService: UtilService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.initializeAndSubscribeCategoryEditForm();

    }

    ngAfterViewInit() {
        // was put here as not this life cycle hook runs when all the dom element are made(except external api call eg. http);
        this.initializeConfirmationDialogModel();

    }

    ngOnDestroy() {
        if (this.editFormSubscription && !this.editFormSubscription.closed) {
            this.editFormSubscription.unsubscribe();
        }
    }

    initializeAndSubscribeCategoryEditForm() {

        this.categoryEditForm = new FormGroup({
            name: new FormControl(this.currentCategory.name, [Validators.required]),
            description: new FormControl(this.currentCategory.description, [Validators.required])
        });
        this.editFormSubscription = this.categoryEditForm.valueChanges.subscribe(values => {
            this.areSomeEquivalent(this.currentCategory, values);
        });

    }

    areAllPropertyEquivalent(a: any, b: any) {
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);

        for(let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];

            if (a[propName] !== b[propName]) {
                this.categoryEditForm.markAsDirty();
                return;
            }
        }
        this.categoryEditForm.markAsPristine();
    }


    areSomeEquivalent(a: any, b: any) {
        const parameters: string [] = ['name', 'description'];
        const n = parameters.length;

        for (let i = 0; i < n; ++i) {
            const propName = parameters[i];
            if (a[propName] !== b[propName]) {
                this.categoryEditForm.markAsDirty();
                return;
            }
        }
        this.categoryEditForm.markAsPristine();
    }


    initializeConfirmationDialogModel() {
        this.initializeDeleteConfirmationDialogModel();
        this.initializeSaveConfirmationDialogModel();
    }


    initializeDeleteConfirmationDialogModel() {
        // const myModalEl = <HTMLElement>document.getElementById('myModal');
        const myModalEl = this.deleteConfirmationDialogModelTemplateRef.nativeElement;
        console.log('to-do detail myModelEl is : ', myModalEl);
        this.deleteConfirmationDialogModel = new Modal(myModalEl, {
            backdrop: 'static', // means the modal will not close when clicking outside it.
            keyboard: false,
            focus: true
        });
    }

    initializeSaveConfirmationDialogModel() {
        // const myModalEl = <HTMLElement>document.getElementById('myModal');
        const myModalEl = this.saveConfirmationDialogModelTemplateRef.nativeElement;
        console.log('to-do detail myModelEl is : ', myModalEl);
        this.saveConfirmationDialogModel = new Modal(myModalEl, {
            backdrop: 'static', // means the modal will not close when clicking outside it.
            keyboard: false,
            focus: true
        });
    }


    toggleEditMode() {
        this.categoryEditMode = !this.categoryEditMode;
    }


    cancelDelete() {
        this.deleteConfirmationDialogModel.hide();

    }


    cancelSave() {
        this.saveConfirmationDialogModel.hide();

    }


    onSaveAction(event: Event) {
        if (!this.categoryEditForm.dirty) {
            this.categoryEditMode = false;
            return;
        }
        this.saveConfirmationDialogModel.show();
    }


    onDeleteAction() {
        this.deleteConfirmationDialogModel.show();
    }


    async OnSaveConfirm(event: Event) {
        this.saveConfirmationDialogModel.hide();
        this.invalidFormSubmission = false;
        if (!this.categoryEditForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }

        const crudOperationsParentButton = this.crudOperationsParentButtonTemplateRef.nativeElement;
        crudOperationsParentButton.classList.add("buttonDisable");
        this.categoryEditForm.disable();

        // tslint:disable-next-line:no-non-null-assertion
        const name = this.categoryEditForm.get('name')!.value; // telling the compiler that value wil always exist
        const description = this.categoryEditForm.get('description')?.value; // another trick using optional chaining
        console.log("Category added");

        await new Promise((resolve) => setTimeout(() => resolve(true), 3000));
        const editStatus = await this.taskManagementService.editCategoryInfo({
            id: this.currentCategory.id,
            name,
            description
        });
        if(editStatus) {
            this.currentCategory = await this.taskManagementService.getCategoryDetail(this.currentCategory.id);
        }
        crudOperationsParentButton.classList.remove("buttonDisable");
        this.categoryEditForm.enable();
        this.categoryEditMode = false;
    }


    toggleSpinnerStatus() {
        console.log('old spinner status ', this.showSpinner);
        this.showSpinner = !this.showSpinner;
        console.log('new spinner status ', this.showSpinner);
    }


    async OnDeleteConfirm() {
        this.deleteConfirmationDialogModel.hide();
        this.toggleSpinnerStatus();
        const deletionStatus = await this.taskManagementService.deleteCategory(this.currentCategory);
        this.toggleSpinnerStatus();
        if(deletionStatus) {
            this.router.navigate([ '../' ], {
                relativeTo: this.activatedRoute
            });
        }
    }

    formatTime(date: Date) {
        return UtilService.formatTime(date);
    }


}
