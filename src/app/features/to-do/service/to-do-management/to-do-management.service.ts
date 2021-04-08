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
        const sampleTaskDetail: string = '12 3 Detail of task - Lorem Ipsum is simply dumm text of the printing and typesetting industry.Lorem Ipsum has been the industry'
        +'s standar dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to'
        + 'make a type specimen'
           +'         book.It has survived not only five centuries, but also the leap into electronic typesetting,'
            +'remaining essentially unchanged.It was popularized in the 1960s with the release of Letraset sheets containing Lorem'
        +' Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
        let taskId = 1;
        for (let i = 0; i < 10; ++i) {
            const taskCategory: TaskCategory = new TaskCategory();
            taskCategory.setCategoryId(i + 1);
            taskCategory.setCategoryTitle(categoryTitle);
            taskCategory.setCategoryDescription(categoryDescription);
            taskCategory.setCreationTime(new Date());
            taskCategory.setModifiedTime(new Date());
            this.createSampleTasks("TaskTitle", sampleTaskDetail, true, taskId, taskCategory.getCategoryId());
            taskId += 5;
            this.createSampleTasks("TaskTitle", "Word of the task Word of the task Word of the task Word of the task", false, taskId, taskCategory.getCategoryId());
            taskId += 5;
            taskCategory.setTaskCount(10);
            this.taskCategories.push(taskCategory);
        }
        this.updateDataForObservers();
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
