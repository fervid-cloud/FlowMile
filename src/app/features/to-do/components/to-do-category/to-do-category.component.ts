import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskCategory } from '../../model/task-category';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-to-do-category',
    templateUrl: './to-do-category.component.html',
    styleUrls: ['./to-do-category.component.css']
})
export class ToDoCategoryComponent implements OnInit {


    taskCategories: TaskCategory[] = [];

    constructor(
        private todoManagementService: ToDoManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute


    ) { }

    ngOnInit(): void {
        this.initializeSubscriptions();
    }


    private initializeSubscriptions() {
        this.subscribeToTaskCategories();
    }


    private subscribeToTaskCategories() {
        this.todoManagementService.taskCategories$.subscribe((updatedTaskCategories) => {
            this.taskCategories = updatedTaskCategories;
        });
    }

    onChoosingViewDetail(taskCategoryId: number) {
        this.router.navigate([taskCategoryId], {
            relativeTo: this.activatedRoute
        });
    }

}
