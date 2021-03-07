import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/to-do';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

    toDoList: Todo[] = [];

    constructor() { }

    ngOnInit(): void {
        this.createTask("TaskTitle", "Word of the task", true);
        this.createTask("TaskTitle", "Word of the task 2", false);


    }

    createTask(arg0: string, arg1: string, arg2: boolean) {
        for (let i = 0; i < 5; ++i) {

        }
    }

    private makeArray(n: number) : number []{
        const currentArray = [];
        for (let i = 0; i < n; ++i) {
            currentArray.push(0);
        }
        return currentArray;
    }

    getArray(n: number) : number [] {
        return this.makeArray(n);;
    }

}
