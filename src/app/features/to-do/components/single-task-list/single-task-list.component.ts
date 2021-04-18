import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../model/task';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';

@Component({
    selector: 'app-single-task-list',
    templateUrl: './single-task-list.component.html',
    styleUrls: ['./single-task-list.component.css']
})
export class SingleTaskListComponent implements OnInit, AfterViewInit {

    @Input('tasksInfo') tasksInfoPage!: PaginationWrapperDto;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        console.log('the input tasks are : ');
        console.log(this.tasksInfoPage);
    }


    onChoosingViewDetail(taskId: number): void {
        this.router.navigate([taskId], {
            relativeTo: this.activatedRoute
        });
    }

}
