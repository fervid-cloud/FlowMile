import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { TaskCategory } from '../../model/task-category';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';
// import Tooltip from 'bootstrap/js/dist/tooltip';
import Modal from 'bootstrap/js/dist/modal';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { CriteriaInfo, ListFilterSortPaginationWrapper } from '../../model/list-filterWrapper';
import { ListFilterSortPaginationWrapperDto } from '../../dto/list-filter-wrapper-dto';
import { AnimatedSearchInputComponent } from '../../../../shared/components/animated-search-input/animated-search-input.component';

@Component({
    selector: 'app-to-do-category',
    templateUrl: './to-do-category.component.html',
    styleUrls: ['./to-do-category.component.css']
})
export class ToDoCategoryComponent implements OnInit, AfterViewInit, OnDestroy {

    // adding a template reference of this element to avoid some global mis - happening related to model dialog
    @ViewChild('addCategoryModelDialog')
    addCategoryModelDialogTemplateRef!: ElementRef;

    @ViewChild('inputSearchBar') inputSearchBar!: AnimatedSearchInputComponent;

    private addTaskModelDialog!: Modal;

    currentActiveCategoriesInfo: PaginationWrapperDto = new PaginationWrapperDto();

    private taskCategorySubscription!: Subscription;

    newCategoryForm!: FormGroup;

    invalidFormSubmission = false;

    creatingCategoryState = false;

    showSpinner = false;
    activatedQueryParamRouteSubscription!: Subscription;
    currentPageNumber: any;

    currentListFilterSortPaginationWrapper: ListFilterSortPaginationWrapper = {};

    private searchWait = 500;

    setTimeoutTracker: any = undefined;

    sortCriteriaInfoList: CriteriaInfo[];

    constructor(
        private taskManagementService: TaskManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.sortCriteriaInfoList = this.taskManagementService.sortCriteriaInfoList;
        this.updatedCurrentCategoryListInfo(
            this.taskManagementService.InitializeCategoryListFilterSortPaginationWrapperDto()
        );
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
            const queryParams = updatedQueryParams as ListFilterSortPaginationWrapperDto; // basically casting the object to our object and thus avoiding manual updated
            console.log('--------------------------------------');
            console.log(queryParams);
            const queryData: ListFilterSortPaginationWrapperDto = this.taskManagementService.InitializeCategoryListFilterSortPaginationWrapperDto();
            this.taskManagementService.copyAndUpdateToAllowedAndDefaultValues(queryData, queryParams);
            console.log('updated queryData is : ', queryData);
            await this.showLoading( async () => {
                try {
                    this.currentActiveCategoriesInfo = await this.taskManagementService.fetchFilteredCategories(queryData);
                } catch(ex) {
                    console.log("error while fetching");
                    console.log("error was ", ex.message);
                } finally {
                    this.updatedCurrentCategoryListInfo(queryData);
                }
            });
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
        this.invalidFormSubmission = false;
        if (!this.newCategoryForm.valid) {
            this.invalidFormSubmission = true;
            return;
        }
        this.creatingCategoryState = true;
        this.newCategoryForm.disable();
        this.addTaskModelDialog.hide();
        // tslint:disable-next-line:no-non-null-assertion
        const name = this.newCategoryForm.get('name')!.value; // telling the compiler that value wil always exist
        const description = this.newCategoryForm.get('description')?.value; // another trick using optional chaining
        console.log("Category added");
        await this.taskManagementService.createNewCategory({
            name,
            description
        });
        this.creatingCategoryState = false;
        this.newCategoryForm.enable();
        this.newCategoryForm.reset();
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


    manageNameSearchThroughDebouncing = (emittedSearchValue: string): void => {
        if (this.setTimeoutTracker) {
            clearTimeout(this.setTimeoutTracker);
        }

        this.setTimeoutTracker = setTimeout(() => {
            this.handleSearchNameCriteria(emittedSearchValue);
        }, this.searchWait);
    }


    resetOpenedSearchBar(): void {
        this.inputSearchBar?.resetOpenedSearchBar();
    }


    handleSelectedSortCriteria(selectedCriteria: CriteriaInfo): void {
        // even though it is duplicated here in the sense that it will be again assigned later after activated query parameter, but still we can ignore one duplicate if compare to making lot of changes
        this.currentListFilterSortPaginationWrapper.sort = selectedCriteria;
        console.log('requested query, ', selectedCriteria);
        console.log('updated the query, ', this.currentListFilterSortPaginationWrapper.sort);
        this.navigateToUpdatedQueryParams();
    }


    handleSelectedPage(newPageNumber: number): void {
        this.currentListFilterSortPaginationWrapper.page = newPageNumber;
        this.navigateToUpdatedQueryParams();
    }

    private handleSearchNameCriteria(emittedSearchValue: string): void {
        this.currentListFilterSortPaginationWrapper.name = emittedSearchValue;
        this.navigateToUpdatedQueryParams();
    }


    private navigateToUpdatedQueryParams(): void {
        console.log('updated the query, ', this.currentListFilterSortPaginationWrapper);
        const queryParams: Params = {};
        // queryParams.type = this.currentListFilterSortPaginationWrapper.type?.shortName;
        if (this.currentListFilterSortPaginationWrapper.name?.trim().length) {
            queryParams.name = this.currentListFilterSortPaginationWrapper.name;
        }
        queryParams.sort = this.currentListFilterSortPaginationWrapper.sort?.shortName;
        queryParams.page = this.currentListFilterSortPaginationWrapper.page;
        this.router.navigate([], {
            queryParams,
            relativeTo: this.activatedRoute,
            // queryParamsHandling: 'merge'
        });
    }

    private updatedCurrentCategoryListInfo(queryData: ListFilterSortPaginationWrapperDto): void {
        this.currentListFilterSortPaginationWrapper.type = this.taskManagementService.validateTypeCriteria(queryData.type);
        this.currentListFilterSortPaginationWrapper.sort = this.taskManagementService.validateSortCriteria(queryData.sort);
        this.currentListFilterSortPaginationWrapper.name = queryData.name;
        this.currentListFilterSortPaginationWrapper.page = queryData.page;
        this.currentListFilterSortPaginationWrapper.pageSize = queryData.pageSize;
    }


}
