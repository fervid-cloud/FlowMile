import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../model/to-do';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

    @Input() curTodoList: Todo[] = [];

    constructor() { }

    ngOnInit(): void {
    }

}
