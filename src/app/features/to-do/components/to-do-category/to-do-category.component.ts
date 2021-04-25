import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { TaskCategory } from '../../model/task-category';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';
// import Tooltip from 'bootstrap/js/dist/tooltip';
import Modal from 'bootstrap/js/dist/modal';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { CriteriaInfo, ListFilterSortPaginationWrapper, sortCriteriaInfo, typeCriteriaInfo } from '../../model/list-filterWrapper';

@Component({
    selector: 'app-to-do-category',
    templateUrl: './to-do-category.component.html',
    styleUrls: ['./to-do-category.component.css']
})
export class ToDoCategoryComponent implements OnInit, OnDestroy {

    // adding a template reference of this element to avoid some global mis - happening related to model dialog
    @ViewChild('addCategoryModelDialog')
    addCategoryModelDialogTemplateRef!: ElementRef;

    private addTaskModelDialog!: Modal;

    taskCategoriesInfo: PaginationWrapperDto = new PaginationWrapperDto();

    private taskCategorySubscription!: Subscription;

    newCategoryForm!: FormGroup;

    invalidCategoryCreationAttempt = false;

    creatingCategoryState = false;

    showSpinner = false;
    activatedQueryParamRouteSubscription!: Subscription;
    currentPageNumber: any;

    currentListFilterSortPaginationWrapper!: ListFilterSortPaginationWrapper;

    sortCriteriaInfo: CriteriaInfo[] = sortCriteriaInfo;

    typeCriteriaInfo: CriteriaInfo [] = typeCriteriaInfo;

    private searchWait = 500;

    setTimeoutTracker: any = undefined;

    constructor(
        private taskManagementService: TaskManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.currentListFilterSortPaginationWrapper = {
            type: typeCriteriaInfo[0],
            sort: sortCriteriaInfo[0],
            name:  "",
            pageNumber: 1,
            pageSize: 24
        };

    }

    ngOnInit(): void {
        this.initializeSubscriptions();
        this.categoryCreateFormInitialization();
    }



    categoryCreateFormInitialization(): void {
        this.newCategoryForm = new FormGroup({
            name: new FormControl(null, [Validators.required, this.isStringValidator.bind(this)]),
            description: new FormControl(null, Validators.required)
        });
    }

    isStringValidator(currentFormControl: FormControl): { [key: string]: boolean } | null {
        if (currentFormControl.value == null) {
            // at the start of the our reactive form initialization, it's get called and at that time
            // our value is null so we are not looking for that case, so avoiding it
            return null;
        }
        const categoryName = currentFormControl.value;
        console.log(currentFormControl);

        const n = categoryName.length;

        for (let i = 0; i < n; ++i) {
            if (!((categoryName[i] >= 'a' && categoryName[i] <= 'z') || (categoryName[i] >= 'A' && categoryName[i] <= 'Z'))) {
                return { invalidName: true };
            }
        }

        return null;
    }


    private initializeSubscriptions(): void {
        this.subscribeToActivatedQueryParams();
    }

    subscribeToActivatedQueryParams(): void {
        this.activatedQueryParamRouteSubscription = this.activatedRoute.queryParams.subscribe(async (updatedQueryParams: Params) => {

            const pageNumber = updatedQueryParams.page;
            console.log("The before updated page number is : ", pageNumber);
            this.currentPageNumber = UtilService.getUpdatedPageNumber(pageNumber);
            console.log('calling task service in queryParams subscribe--------------');
            console.log("the current page is : " , this.currentPageNumber);
            await this.showLoading( async () => {
                 // await new Promise((resolve) => setTimeout(() => resolve(true), 300000));
                 return this.getAllCategories(this.currentPageNumber);
            });
            this.taskManagementService.setLastCategoriesListPageNumber(this.currentPageNumber);
        });
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


    initializeAddTaskCategoryModelDialog(): void {
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
                container: 'dashboard-body',
                placement: 'left',
                trigger: 'hover',
                title: "Add Category"
            });
        }); */
    }


    private async getAllCategories(pageNumber: number): Promise<void> {
        // await new Promise(resolve => setTimeout(() => resolve(true), 3000));
        console.log("sending the request to get all the task categories");
        this.taskCategoriesInfo = await this.taskManagementService.getAllTasksCategories(pageNumber);
    }

    onChoosingViewDetail(taskCategoryId: number): void{

        this.router.navigate([taskCategoryId], {
            relativeTo: this.activatedRoute
        });
    }


    addTaskCategory(): void {
        this.addTaskModelDialog.show();
    }

    cancelAddTaskCategory(): void {
        this.addTaskModelDialog.hide();
    }

    async addTaskCategorySubmit(event: Event): Promise<void> {
        this.invalidCategoryCreationAttempt = false;
        if (!this.newCategoryForm.valid) {
            this.invalidCategoryCreationAttempt = true;

            return;
        }
        this.creatingCategoryState = true;
        this.newCategoryForm.disable();
        this.addTaskModelDialog.hide();

        const newTaskCategory: TaskCategory = new TaskCategory();

        // tslint:disable-next-line:no-non-null-assertion
        const name = this.newCategoryForm.get('name')!.value; // telling the compiler that value wil always exist
        const description = this.newCategoryForm.get('description')?.value; // another trick using optional chaining

        await this.showLoading(async () => {
            newTaskCategory.id = 0;
            newTaskCategory.name = name;
            newTaskCategory.description = description;
            await this.taskManagementService.createNewCategory(newTaskCategory);
            this.creatingCategoryState = false;
            this.newCategoryForm.enable();
            this.newCategoryForm.reset();
        });


    }



    ngOnDestroy(): void {
        this.addTaskModelDialog?.dispose();
        this.taskCategorySubscription?.unsubscribe();
        this.activatedQueryParamRouteSubscription?.unsubscribe();
    }


    async showLoading(callback: () => void): Promise<void> {
        try {
            this.showSpinner = true;
            await callback();
        } finally {
            this.showSpinner = false;
        }
    }

    manageThroughDebouncingSearch(emittedSearchValue: string): void {
        if (this.setTimeoutTracker) {
            clearTimeout(this.setTimeoutTracker);
        }

        this.setTimeoutTracker = setTimeout(() => {
            const navigationExtraInfo: NavigationExtras = {};
            if (emittedSearchValue.length > 0) {
                navigationExtraInfo.queryParams = {
                    search: emittedSearchValue
                };
            }
            navigationExtraInfo.relativeTo = this.activatedRoute;
            this.router.navigate([], navigationExtraInfo);
        }, this.searchWait);
    }

    handleSelectedSortCriteria(selectedCriteria: CriteriaInfo): void {
        const chosenCriteria: CriteriaInfo [] = this.sortCriteriaInfo.filter(criteria => criteria.id == selectedCriteria.id);
        if (chosenCriteria.length > 0) {
            this.currentListFilterSortPaginationWrapper.sort = chosenCriteria[0];
        }
    }

}
