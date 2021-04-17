import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskCategory } from '../../model/task-category';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';
// import Tooltip from 'bootstrap/js/dist/tooltip';
import Modal from 'bootstrap/js/dist/modal';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';

@Component({
    selector: 'app-to-do-category',
    templateUrl: './to-do-category.component.html',
    styleUrls: ['./to-do-category.component.css']
})
export class ToDoCategoryComponent implements OnInit {

    // adding a template reference of this element to avoid some global mis - happening related to model dialog
    @ViewChild("addCategoryModelDialog")
    addCategoryModelDialogTemplateRef!: ElementRef;

    private addTaskModelDialog!: Modal;

    taskCategoriesInfo!: PaginationWrapperDto;

    private taskCategorySubscription!: Subscription;

    newCategoryForm!: FormGroup;

    invalidCategoryCreationAttempt: boolean = false;

    creatingCategoryState: boolean = false;

    showSpinner: boolean = false;

    constructor(
        private todoManagementService: ToDoManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.initializeSubscriptions();
        this.categoryCreateFormInitialization();
        this.fetchRequiredCategoriesData();
    }

    async fetchRequiredCategoriesData() {
        this.showSpinner = true;
        try {
            await this.todoManagementService.getAllTasksCategories();
        } finally {
            this.showSpinner = false;
        }
    }


    categoryCreateFormInitialization() {
        this.newCategoryForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, this.isStringValidator.bind(this)]),
            'description': new FormControl(null, Validators.required)
        });
    }

    isStringValidator(currentFormControl: FormControl): { [key: string]: boolean } | null {
        if (currentFormControl.value == null) {
            // at the start of the our reactive form initialization, it's get called and at that time
            //our value is null so we are not looking for that case, so avoiding it
            return null;
        }
        const categoryName = currentFormControl.value;
        console.log(currentFormControl);

        const n = categoryName.length;

        for (let i = 0; i < n; ++i) {
            if (!((categoryName[i] >= 'a' && categoryName[i] <= 'z') || (categoryName[i] >= 'A' && categoryName[i] <= 'Z'))) {
                return { 'invalidName': true };
            }
        }

        return null;
    }


    private initializeSubscriptions() {
        this.subscribeToTaskCategories();
    }

    ngAfterViewInit() {
        // actually what was happening was that old Model with same Id was not destroyed till now, so
        // when were doing fetching the modal component, It was fetching the previous one
        // after selecting all classes with name, like this
        // const modal = document.querySelectorAll(".modal");
        // console.log(modal);
        // found this
        // // 0: div#myModal.modal.fade.tododetail.show
        // 1: div#myModal.modal.fade
        // i.e why setup timeout to give the time to get old one destroyed completely so that we can fetch new one
        // this.initializeToolTip();
        /*     setTimeout(() => {
            this.initializeAddTaskCategoryModelDialog();
        }, 500);
         */
        // 2. the other approach could be take the current model by using template Reference and ViewChild
        // 3. the other approach for error proof is to use different Id for each model and mention it here
        this.initializeAddTaskCategoryModelDialog();
    }


    initializeAddTaskCategoryModelDialog() {
        // const myModalEl = <HTMLElement>document.querySelector('#myModal');
        const myModalElement = this.addCategoryModelDialogTemplateRef.nativeElement;
        this.addTaskModelDialog = new Modal(myModalElement, {
            backdrop: 'static', // means the modal will not close when clicking outside it.
            keyboard: false,
            focus: true,
        });
    }

    initializeToolTip() {
        /* was sometime not working 10-20% time due to some problem in bootstrap 5 alpha 2 as bootstrap used to use jquery before bootstrap 5,
        but below is how we initialize for tooltip, also add bootstrap.bundle.js instead of bootstrap.js or bootstrap.min.js */
        /* const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl, {
                container: 'body',
                placement: 'left',
                trigger: 'hover',
                title: "Add Category"
            });
        }); */
    }


    private subscribeToTaskCategories() {
        this.taskCategorySubscription = this.todoManagementService.taskCategoriesInfo$.subscribe((updatedCategoriesInfo) => {
            this.taskCategoriesInfo = updatedCategoriesInfo;
        });
    }

    onChoosingViewDetail(taskCategoryId: number) {
        this.router.navigate([taskCategoryId], {
            relativeTo: this.activatedRoute
        });
    }


    addTaskCategory() {
/*         const myModalEl = <HTMLElement>document.querySelector('#myModal');
        console.log("my category modal is : ", myModalEl);
        console.log(this.addTaskModelDialog);
        const modal = document.querySelectorAll(".modal");
        console.log(modal); */

        this.addTaskModelDialog.show();


    }

    cancelAddTaskCategory() {
        this.addTaskModelDialog.hide();
    }

    async addTaskCategorySubmit(event: Event) {

        // const submitButton: HTMLButtonElement = event.target as HTMLButtonElement;

        this.invalidCategoryCreationAttempt = false;
        if (!this.newCategoryForm.valid) {
            this.invalidCategoryCreationAttempt = true;

            return;
        }
        this.creatingCategoryState = true;
        this.newCategoryForm.disable();
        this.addTaskModelDialog.hide();

        const newTaskCategory: TaskCategory = new TaskCategory();

        let categoryTitle = this.newCategoryForm.get("name")!.value; // telling the compiler that value wil always exist
        let categoryDescription = this.newCategoryForm.get("description")?.value; // another trick using optional chaining

        this.toggleSpinnerStatus();

        newTaskCategory.setCategoryTitle(categoryTitle);
        newTaskCategory.setCategoryDescription(categoryDescription);
        newTaskCategory.setTaskCount(0);
        await this.todoManagementService.createNewCategory(newTaskCategory);

        this.creatingCategoryState = false;
        this.newCategoryForm.enable();
        this.newCategoryForm.reset();

        this.toggleSpinnerStatus();

    }



    ngOnDestroy() {
        this.addTaskModelDialog.dispose();
        this.taskCategorySubscription.unsubscribe();
    }


    toggleSpinnerStatus() {
        console.log("old spinner status ", this.showSpinner);
        this.showSpinner = !this.showSpinner;
        console.log("new spinner status ", this.showSpinner);
    }



}
