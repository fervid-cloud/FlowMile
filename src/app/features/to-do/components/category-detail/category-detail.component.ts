import { Component, Input, OnInit } from '@angular/core'
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

    private activatedRouteSubscription!: Subscription;

    constructor(
        private todoManagementService: ToDoManagementService,
        private utilService: UtilService
    ) { }

    ngOnInit(): void {

    }


}
