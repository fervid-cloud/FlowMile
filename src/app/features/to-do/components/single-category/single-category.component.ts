import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { TaskCategory } from '../../model/task-category';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';
import { AnimatedSearchInputComponent } from '../../../../shared/components/animated-search-input/animated-search-input.component';

@Component({
    selector: 'app-single-category',
    templateUrl: './single-category.component.html',
    styleUrls: ['./single-category.comonent.css']

})
export class SingleCategoryComponent implements OnInit {

    currentCategory!: TaskCategory;

    private activatedRouteSubscription!: Subscription;


    constructor(
        private taskManagementService: TaskManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    async ngOnInit(): Promise<void> {
        // by default angular nagivates relative to root route
        // this.router.navigate(["list", "all"], {
        //     relativeTo: this.activatedRoute
        // });
        await this.subscribeToActivatedRoute();


    }

    ngOnDestroy() {
        this.activatedRouteSubscription.unsubscribe();
    }


    subscribeToActivatedRoute(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(async (updatedParams: Params) => {
            console.log('The activated routes params is : ', updatedParams);
            const allParams: Params = UtilService.getAllRouteParams1(this.activatedRoute);
            console.log('all params in  single category route are : ', allParams);
            const currentTaskCategoryId = allParams.categoryId;
            // await new Promise((resolve, reject) => setTimeout(() => resolve(4), 4000));
            await this.showCurrentCategory(currentTaskCategoryId);

            console.log('current category detail is ', this.currentCategory);
        });
    }


    async showCurrentCategory(currentTaskCategoryId: number): Promise<void> {
        const targetCategory = await this.taskManagementService.getCategoryDetail(currentTaskCategoryId);
        if (!targetCategory) {

            console.log("current category doesn't exists");
            this.router.navigate(['..'], {
                relativeTo: this.activatedRoute
            });

            return;
            // throw new Error("task category not found, there is some inconsistency in the data");
        }
        console.log(targetCategory);
        this.currentCategory = targetCategory;
    }

    goBack(): void {
        const previousPage = this.taskManagementService.getLastCategoriesListPageNumber();
        const navigationExtraInfo: NavigationExtras = {};
        console.log("previous page is : ", previousPage);
        navigationExtraInfo.relativeTo = this.activatedRoute;
        if (previousPage > 1) {
            navigationExtraInfo.queryParams = {
                page: previousPage
            };
        }
        navigationExtraInfo.queryParamsHandling = 'merge';
        this.router.navigate(["../"], navigationExtraInfo);
    }



}
