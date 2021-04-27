import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { AnimatedSearchInputComponent } from '../../../../shared/components/animated-search-input/animated-search-input.component';
import { CriteriaInfo, ListFilterSortPaginationWrapper } from '../../model/list-filterWrapper';
import { ListFilterSortPaginationWrapperDto } from '../../dto/list-filter-wrapper-dto';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
    styleUrls: [ './task-list.component.css' ]
})
export class TaskListComponent implements OnInit, OnDestroy {


    currentActiveTasksInfo: PaginationWrapperDto = new PaginationWrapperDto();

    showSpinner = false;

    @ViewChild('inputSearchBar') inputSearchBar!: AnimatedSearchInputComponent;

    private searchWait = 500;
    setTimeoutTracker: any = undefined;

    currentListFilterSortPaginationWrapper: ListFilterSortPaginationWrapper = {};

    // subscriptions
    private activatedParamRouteSubscription!: Subscription;
    private activatedQueryParamRouteSubscription!: Subscription;
    currentActiveSubscription!: Subscription;

    typeCriteriaInfoList: CriteriaInfo [];

    sortCriteriaInfoList: CriteriaInfo[];


    constructor(
        private taskManagementService: TaskManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

        this.typeCriteriaInfoList = this.taskManagementService.typeCriteriaInfoList;
        this.sortCriteriaInfoList = this.taskManagementService.sortCriteriaInfoList;
        this.updatedCurrentTaskListInfo(
            this.taskManagementService.InitializeListFilterSortPaginationWrapperDto()
        );

    }


    ngOnInit(): void {
        console.log('reached ngOnInit of list component here');
        this.initializeSubscriptions();
    }


    private initializeSubscriptions(): void {
        this.subscribeToActivatedRoute();

    }


    subscribeToActivatedRoute(): void {

        this.activatedParamRouteSubscription = this.activatedRoute.params.subscribe(async (updatedParams: Params) => {
            const allParams: Params = UtilService.getAllRouteParams1(this.activatedRoute);
            this.taskManagementService.taskCategoryId = allParams.categoryId;
            console.log('handling path params');
            console.log('path params are : ', updatedParams);
            if (!UtilService.isValidNumber(this.taskManagementService.taskCategoryId)) {
                await this.router.navigate([ '/dashboard' ]);
                return;
            }
        });

        this.activatedQueryParamRouteSubscription = this.activatedRoute.queryParams.subscribe(async (updatedQueryParams: Params) => {
            // It runs first time also avoiding the need of using fetch request in route params when browser is
            // loaded, because, we are subscribing to queryParams which I believe is
            // behaviour subject which give it's output first time also when we subscribe to it
            return this.handleActivatedRouteQueryParams(updatedQueryParams);
        });
    }

    private async handleActivatedRouteQueryParams(updatedQueryParams: Params): Promise<void> {
        const queryParams = updatedQueryParams as ListFilterSortPaginationWrapperDto; // basically casting the object to our object and thus avoiding manual updated
        console.log('--------------------------------------');
        console.log(queryParams);
        const queryData: ListFilterSortPaginationWrapperDto = this.taskManagementService.InitializeListFilterSortPaginationWrapperDto();
        this.taskManagementService.copyAndUpdateToAllowedAndDefaultValues(queryData, queryParams);
        console.log('updated queryData is : ', queryData);
        await this.showLoading( async () => {
            try {
                this.currentActiveTasksInfo = await this.taskManagementService.fetchFilteredTasks(queryData);
            } catch(ex) {
                console.log("error while fetching");
                console.log("error was ", ex.message);
            } finally {
                this.updatedCurrentTaskListInfo(queryData);
            }
        });

    }





    ngOnDestroy(): void {
        this.clearSubscriptions();
    }

    private clearSubscriptions(): void {
        this.currentActiveSubscription?.unsubscribe();
        this.activatedParamRouteSubscription?.unsubscribe();
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


    handleSelectedTypeCriteria(selectedCriteria: CriteriaInfo): void {
        this.currentListFilterSortPaginationWrapper.type = selectedCriteria;
        console.log('requested query, ', selectedCriteria);
        console.log('updated the query, ', this.currentListFilterSortPaginationWrapper.type);
        this.navigateToUpdatedQueryParams();
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


    onChoosingViewDetail(taskId: number): void {
        this.router.navigate(['../..', taskId], {
            relativeTo: this.activatedRoute
        });
    }

    private navigateToUpdatedQueryParams(): void {
        console.log('updated the query, ', this.currentListFilterSortPaginationWrapper);
        const queryParams: Params = {};
        queryParams.type = this.currentListFilterSortPaginationWrapper.type?.shortName;
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


    private updatedCurrentTaskListInfo(queryData: ListFilterSortPaginationWrapperDto): void {
        this.currentListFilterSortPaginationWrapper.type = this.taskManagementService.validateTypeCriteria(queryData.type);
        this.currentListFilterSortPaginationWrapper.sort = this.taskManagementService.validateSortCriteria(queryData.sort);
        this.currentListFilterSortPaginationWrapper.name = queryData.name;
        this.currentListFilterSortPaginationWrapper.page = queryData.page;
        this.currentListFilterSortPaginationWrapper.pageSize = queryData.pageSize;
    }

}
