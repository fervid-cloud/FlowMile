import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDoTask } from '../../model/to-do-task';

@Injectable({
    providedIn: 'root'
})
export class ToDoManagementService {


    private toDoTasks: ToDoTask[] = [];

    private _toDoTasks: BehaviorSubject<ToDoTask[]> = new BehaviorSubject<ToDoTask[]>([]);

    public toDoTasks$ : Observable<ToDoTask[]>;

    constructor() {
        this.toDoTasks$ = this._toDoTasks.asObservable();
        this.initializeTasks();
        this._toDoTasks.next(this.toDoTasks);
    }

    initializeTasks() {
        this.createSampleTasks("TaskTitle", "Word of the task Word of the task Word of the task Word of the task", true, 1);
        this.createSampleTasks("TaskTitle", "Word of the task 2", false, 6);
        this.toDoTasks[0].setTextContent("Detail of task - Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

    }

    createSampleTasks(title: string, textContent: string, taskStatus: boolean, start: number) {
        for (let i = start; i < start + 5; ++i) {
            const currentToDo: ToDoTask = new ToDoTask();
            currentToDo.setTodoId(i);
            currentToDo.setTitle(title);
            currentToDo.setTextContent(textContent);
            currentToDo.setTaskStatus(taskStatus);
            currentToDo.setCreationTime(new Date());
            currentToDo.setModifiedTime(new Date());
            this.toDoTasks.push(currentToDo);
        }
    }


    findByTaskId(providedTaskId: number): ToDoTask | undefined {
        return this.toDoTasks.find(toDoTask => toDoTask.getTodoId() == providedTaskId);
    }

    deleteTaskById(providedTaskId: number) {
        this.toDoTasks = this.toDoTasks.filter(task => task.getTodoId() !== providedTaskId);
        this._toDoTasks.next(this.toDoTasks);
    }


}
