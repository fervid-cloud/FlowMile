import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { TaskCategory } from '../../model/task-category';
import { Task } from '../../model/task';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';

@Component({
    selector: 'app-single-category',
    templateUrl: './single-category.component.html',
    styleUrls: ['./single-category.comonent.css']

})
export class SingleCategoryComponent implements OnInit {

    currentCategory!: TaskCategory;

    private activatedRouteSubscription!: Subscription;

    constructor(
        private todoManagementService: TaskManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private utilService: UtilService
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


    subscribeToActivatedRoute() {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(async (updatedParams: Params) => {
            console.log('The activated routes params is : ', updatedParams);
            const allParams: Params = this.utilService.getAllRouteParams1(this.activatedRoute);
            console.log('all params are : ', allParams);
            const currentTaskCategoryId = allParams.categoryId;
            // await new Promise((resolve, reject) => setTimeout(() => resolve(4), 4000));
            await this.showCurrentCategory(currentTaskCategoryId);
            console.log('current category detail is ', this.currentCategory);
        });
    }


    async showCurrentCategory(currentTaskCategoryId: number) {
        const targetCategory = await this.todoManagementService.getCategoryDetail(currentTaskCategoryId);
        if (!targetCategory) {

            console.log('current category doesn\'t exists');
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
