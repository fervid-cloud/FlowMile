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
        this.createTask("TaskTitle", "Word of the task Word of the task Word of the task Word of the task", true, 1);
        this.createTask("TaskTitle", "Word of the task 2", false, 6);
        this.toDoList[0].setTextContent("Word of the tasdf dsfsdfdsdfg gfdgdfhfghgfh jhhgj g k Word of the task Word of the task Word of the task task Word of the task Word of the task Word of the task");

    }

    createTask(title: string, textContent: string, taskStatus: boolean, start: number) {
        for (let i = start; i < start + 5; ++i) {
            const currentToDo: Todo = new Todo();
            currentToDo.setTodoId(i);
            currentToDo.setTitle(title);
            currentToDo.setTextContent(textContent);
            currentToDo.setTaskStatus(taskStatus);
            currentToDo.setCreationTime(new Date());
            currentToDo.setUpdationTime(new Date());
            this.toDoList.push(currentToDo);
        }
    }

    getAllTodo() {
        return this.toDoList;
    }

    getPendingTask() {
        return this.toDoList.filter((task) => task.getTaskStatus() == false);
    }

    getDoneTask() {
        return this.toDoList.filter((task) => task.getTaskStatus() == true);
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