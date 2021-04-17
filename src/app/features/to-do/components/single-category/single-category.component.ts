import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { TaskCategory } from '../../model/task-category';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-single-category',
    templateUrl: './single-category.component.html',
    styleUrls: ['./single-category.comonent.css']

})
export class SingleCategoryComponent implements OnInit {


    currentCategory!: TaskCategory;

    private activatedRouteSubscription!: Subscription;

    constructor(
        private todoManagementService: ToDoManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private utilService: UtilService
    ) { }

    ngOnInit(): void {
        // by default angular nagivates relative to root route
        // this.router.navigate(["list", "all"], {
        //     relativeTo: this.activatedRoute
        // });
        this.subscribeToActivatedRoute();


    }

    ngOnDestroy() {
        this.activatedRouteSubscription.unsubscribe();
    }


    subscribeToActivatedRoute() {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((updatedParams: Params) => {
            console.log("The activated routes params is : ", updatedParams);
            const allParams: Params = this.utilService.getAllRouteParams1(this.activatedRoute);
            console.log("all params are : ", allParams);
            const currentTaskCategoryId = allParams['categoryId'];
            this.showCurrentCategory(currentTaskCategoryId);
        });
    }


    async showCurrentCategory(currentTaskCategoryId : number) {
        const targetCategory = await this.todoManagementService.getCategoryDetail(currentTaskCategoryId)
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
}
