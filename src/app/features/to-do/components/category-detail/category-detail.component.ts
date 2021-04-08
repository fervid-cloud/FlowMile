import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Modal from 'bootstrap/js/dist/modal';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { TaskCategory } from '../../model/task-category';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

    @Input("currentCategoryDetail") currentCategory!: TaskCategory;

    @ViewChild('deleteConfirmationDialog')
    deleteConfirmationDialogModelTemplateRef!: ElementRef;

    @ViewChild("saveConfirmationDialog")
    saveConfirmationDialogModelTemplateRef!: ElementRef;

    private deleteConfirmationDialogModel!: Modal;

    private saveConfirmationDialogModel!: Modal;

    private todoManagementServiceSubscription!: Subscription;

    categoryEditMode: boolean = false;

    categoryEditForm!: FormGroup;

    showSpinner: boolean = false;
    editFormSubscription!: Subscription;

    constructor(
        private todoManagementService: ToDoManagementService,
        private utilService: UtilService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.initializeAndSubscribeCategoryEditForm();

    }

    ngAfterViewInit() {
        //was put here as not this life cycle hook runs when all the dom element are made(except external api call eg. http);
        this.initializeConfirmationDialogModel();

    }

    ngOnDestroy() {
        if (this.editFormSubscription && !this.editFormSubscription.closed) {
            this.editFormSubscription.unsubscribe();
        }
    }

    initializeAndSubscribeCategoryEditForm() {

        this.categoryEditForm = new FormGroup({
            'categoryTitle': new FormControl(this.currentCategory.getCategoryTitle(), [Validators.required]),
            'categoryDescription': new FormControl(this.currentCategory.getCategoryDescription(), [Validators.required])
        });
        this.editFormSubscription = this.categoryEditForm.valueChanges.subscribe(values => {
            this.areSomeEquivalent(this.currentCategory, values);
        });

    }

    areAllPropertyEquivalent(a: any, b: any) {
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);

        for (var i = 0; i < aProps.length; i++) {
            let propName = aProps[i];

            if (a[propName] !== b[propName]) {
                this.categoryEditForm.markAsDirty();
                return;
            }
        }
        this.categoryEditForm.markAsPristine();
    }


    areSomeEquivalent(a: any, b: any) {
        const parameters : string [] = ['categoryTitle', 'categoryDescription'];
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
        console.log("to-do detail myModelEl is : ", myModalEl);
        this.deleteConfirmationDialogModel = new Modal(myModalEl, {
            backdrop: 'static', // means the modal will not close when clicking outside it.
            keyboard: false,
            focus: true
        });
    }

    initializeSaveConfirmationDialogModel() {
        // const myModalEl = <HTMLElement>document.getElementById('myModal');
        const myModalEl = this.saveConfirmationDialogModelTemplateRef.nativeElement;
        console.log("to-do detail myModelEl is : ", myModalEl);
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


    onSaveAction() {
        if (!this.categoryEditForm.dirty) {
            this.categoryEditMode = false;
            return;
        }

        this.saveConfirmationDialogModel.show();
    }


    onDeleteAction() {
        this.deleteConfirmationDialogModel.show();
    }


    async OnSaveConfirm() {
        this.saveConfirmationDialogModel.hide();
        this.toggleSpinnerStatus();
        this.currentCategory.setCategoryTitle(this.categoryEditForm.get('categoryTitle')?.value);
        this.currentCategory.setCategoryDescription(this.categoryEditForm.get("categoryDescription")?.value);
        this.currentCategory.setModifiedTime(new Date());
        await this.todoManagementService.editProvidedCategory(this.currentCategory);
        this.categoryEditMode = false;
        this.toggleSpinnerStatus();
    }


    toggleSpinnerStatus() {
        console.log("old spinner status ", this.showSpinner);
        this.showSpinner = !this.showSpinner;
        console.log("new spinner status ", this.showSpinner);
    }


    async OnDeleteConfirm() {
        this.deleteConfirmationDialogModel.hide();
        this.toggleSpinnerStatus();
        await this.todoManagementService.deleteCategoryById(this.currentCategory.getCategoryId());
        this.toggleSpinnerStatus();
        this.router.navigate(['../'], {
            relativeTo: this.activatedRoute
        });
    }


}
