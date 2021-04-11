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

    }

    createTask(todo: ToDoTask) {
        console.log(todo);
        todo.setCreationTime(new Date());
        todo.setModifiedTime(new Date());
        if (!this.categoryTaskMapping[todo.getTaskCategoryId()]) {
            // this.categoryTaskMapping[todo.getTaskCategoryId()] = [];
            throw new Error("No such category exists");
        }

        todo.setTodoId(this.categoryTaskMapping[todo.getTaskCategoryId()].length);


        this.categoryTaskMapping[todo.getTaskCategoryId()].push(todo);
        this._categoryTaskMapping.next(this.categoryTaskMapping);
        console.log("task successfully made");
    }


    findByTaskId(providedCategoryId: number, providedTaskId: number): ToDoTask | undefined {
        console.log(this.categoryTaskMapping);
        return this.categoryTaskMapping[providedCategoryId].find(toDoTask => toDoTask.getTodoId() == providedTaskId);
    }


    async deleteTaskById(providedCategoryId: number, providedTaskId: number) {
        await this.requestMockUp();
        this.categoryTaskMapping[providedCategoryId] =  this.categoryTaskMapping[providedCategoryId].filter(task => task.getTodoId() != providedTaskId);
        this._categoryTaskMapping.next(this.categoryTaskMapping);
    }

    async createNewCategory(newTaskCategory: TaskCategory) {
        await this.requestMockUp();
        newTaskCategory.setCategoryId(Object.keys(this.categoryTaskMapping).length + 1);
        this.taskCategories.push(newTaskCategory);
        this.categoryTaskMapping[newTaskCategory.getCategoryId()] = [];
        this.updateDataForObservers();
    }

    findByCategoryId(currentTaskCategoryId: number): TaskCategory | undefined{
        return this.taskCategories.find(category => category.getCategoryId() == currentTaskCategoryId);
    }


    async deleteCategoryById(categoryId: number) {
        await this.requestMockUp();
        this.taskCategories = this.taskCategories.filter(category => category.getCategoryId() != categoryId);
        delete this.categoryTaskMapping[categoryId];
        this.updateDataForObservers();
    }


    async editProvidedCategory(editedCategory: TaskCategory) {
        await this.requestMockUp();
        const n = this.taskCategories.length;

        for (let i = 0; i < n; ++i) {
            if (this.taskCategories[i].getCategoryId() == editedCategory.getCategoryId()) {
                this.taskCategories[i] = editedCategory;
            }
        }

        this.categoryTaskMapping[editedCategory.getCategoryId()]
        this.updateDataForObservers();

    }

    async editProvidedTask(currentToDoTask: ToDoTask | null | undefined) {
        if (!currentToDoTask) {
            return;
        }
        await this.requestMockUp();

        const tasks = this.categoryTaskMapping[currentToDoTask.getTaskCategoryId()];
        const n = tasks.length;
        for (let i = 0; i < n; ++i) {
            if (tasks[i].getTodoId() == currentToDoTask.getTodoId()) {
                tasks[i] = currentToDoTask;
            }
        }

        this._categoryTaskMapping.next(this.categoryTaskMapping);

    }


    updateDataForObservers() {
        this._taskCategories.next(this.taskCategories);
        this._categoryTaskMapping.next(this.categoryTaskMapping);
    }


    requestMockUp() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }


}
