import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

    currentCategory!: TaskCategory;

    private activatedRouteSubscription!: Subscription;

    constructor(
        private todoManagementService: ToDoManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private utilService: UtilService
    ) { }

    ngOnInit(): void {
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

            this.updateCurrentCategory(currentTaskCategoryId);
        });
    }


    updateCurrentCategory(currentTaskCategoryId: number) {
        const targetCategory = this.todoManagementService.findByCategoryId(currentTaskCategoryId)
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
