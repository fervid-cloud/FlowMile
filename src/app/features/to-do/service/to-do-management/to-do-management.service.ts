import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskCategory } from '../../model/task-category';
import { ToDoTask } from '../../model/to-do-task';

@Injectable({
    providedIn: 'root'
})
export class ToDoManagementService {

    private taskCategories: TaskCategory[] = [];

    private _taskCategories: BehaviorSubject<TaskCategory[]> = new BehaviorSubject<TaskCategory[]>([]);

    public taskCategories$: Observable<TaskCategory[]>;

    private categoryTaskMapping: { [key: number]: ToDoTask [] } = {};

    private _categoryTaskMapping: BehaviorSubject<{ [key: number]: ToDoTask[] }> = new BehaviorSubject<{ [key: number]: ToDoTask[] }>({});

    public categoryTaskMapping$: Observable<{ [key: number]: ToDoTask[] }>;

    constructor() {
        this.taskCategories$ = this._taskCategories.asObservable();
        this.categoryTaskMapping$ = this._categoryTaskMapping.asObservable();
        this.initializeTasks();
    }

    initializeTasks() {
        this.createSampleTaskCategories("CategoryTitle", "This category is for the tasks that are");
    }

    createSampleTaskCategories(categoryTitle: string, categoryDescription: string) {
        let taskId = 1;
        for (let i = 0; i < 10; ++i) {
            const taskCategory: TaskCategory = new TaskCategory();
            taskCategory.setCategoryId(i + 1);
            taskCategory.setCategoryTitle(categoryTitle);
            taskCategory.setCategoryDescription(categoryDescription);
            taskCategory.setCreationTime(new Date());
            taskCategory.setModifiedTime(new Date());
            this.createSampleTasks("TaskTitle", "Word of the task Word of the task Word of the task Word of the task", true, taskId, taskCategory.getCategoryId());
            taskId += 5;
            this.createSampleTasks("TaskTitle", "Word of the task Word of the task Word of the task Word of the task", false, taskId, taskCategory.getCategoryId());
            taskId += 5;
            taskCategory.setTaskCount(10);
            this.taskCategories.push(taskCategory);
        }
        this._taskCategories.next(this.taskCategories);
        this._categoryTaskMapping.next(this.categoryTaskMapping);
    }

    createSampleTasks(title: string, textContent: string, taskStatus: boolean, start: number, taskCategoryId: number) {
        if (!this.categoryTaskMapping[taskCategoryId]) {
            this.categoryTaskMapping[taskCategoryId] = [];
        }
        for (let i = start; i < start + 5; ++i) {
            const currentToDo: ToDoTask = new ToDoTask();
            currentToDo.setTodoId(i);
            currentToDo.setTitle(title);
            currentToDo.setTextContent(textContent);
            currentToDo.setTaskStatus(taskStatus);
            currentToDo.setCreationTime(new Date());
            currentToDo.setModifiedTime(new Date());
            currentToDo.setTaskCategoryId(taskCategoryId);
            this.categoryTaskMapping[taskCategoryId].push(currentToDo);
        }
    }


    createTask(todo: ToDoTask) {
        todo.setCreationTime(new Date());
        todo.setModifiedTime(new Date());
        todo.setTodoId(this.categoryTaskMapping[todo.getTaskCategoryId()].length);
        if (!this.categoryTaskMapping[todo.getTaskCategoryId()]) {
            this.categoryTaskMapping[todo.getTaskCategoryId()] = [];
        }
        this.categoryTaskMapping[todo.getTaskCategoryId()].push(todo);
        this._categoryTaskMapping.next(this.categoryTaskMapping);
        console.log("task successfully made");
    }


    findByTaskId(providedCategoryId: number, providedTaskId: number): ToDoTask | undefined {
        console.log(this.categoryTaskMapping);
        return this.categoryTaskMapping[providedCategoryId].find(toDoTask => toDoTask.getTodoId() == providedTaskId);
    }


    deleteTaskById(providedCategoryId: number, providedTaskId: number) : void {
        this.categoryTaskMapping[providedCategoryId] =  this.categoryTaskMapping[providedCategoryId].filter(task => task.getTodoId() != providedTaskId);
        this._categoryTaskMapping.next(this.categoryTaskMapping);
    }


}
