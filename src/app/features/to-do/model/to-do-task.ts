/* When a decorator function is applied to a Class, the decorator function will only receive one argument which is basically the object of the class being decorated.
Being able to access the argument, you can modify the class as per your requirement.You can change
the constructor of the class, add new prototypes, etc. */


/* function DefaultInitialization(constructorFunction : Function) {
    constructorFunction.prototype.forEach((element: any) => {
        let defaultValue: any = null;
        if (element instanceof String) {
            defaultValue = "default";
        } else if (element instanceof Number) {
            defaultValue = -1;
        } else if (element instanceof Boolean) {
            defaultValue = false;
        }
        if (defaultValue != null) {
            constructorFunction.prototype[`${element}`] = defaultValue;
        }
    });
}
 */



/* The definite assignment assertion is a feature that allows a! to be placed after instance property
and variable declarations to relay to TypeScript that a variable is indeed assigned for all intents
and purposes, even if TypeScript’s analyses cannot detect so. */

// @DefaultInitialization
export class ToDoTask {

    private todoId: number;

    private title: string;

    private textContent: string;

    private creationTime: Date;

    private modifiedTime: Date;

    private taskStatus: boolean;

    private taskCategoryId: number;

    constructor() {

        this.todoId = 0;
        this.title = "";
        this.textContent = "";
        this.creationTime = new Date();
        this.modifiedTime = new Date();
        this.taskStatus = false;
        this.taskCategoryId = 0;

    }

    public getTodoId(): number {
        return this.todoId;
    }

    public setTodoId(todoId: number): void {
        this.todoId = todoId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getTextContent(): string {
        return this.textContent;
    }

    public setTextContent(textContent: string): void {
        this.textContent = textContent;
    }

    public getCreationTime(): Date {
        return this.creationTime;
    }

    public setCreationTime(creationTime: Date): void {
        this.creationTime = creationTime;
    }

    public getModifiedTime(): Date {
        return this.modifiedTime;
    }

    public setModifiedTime(modifiedTime: Date): void {
        this.modifiedTime = modifiedTime;
    }

    public getTaskStatus(): boolean {
        return this.taskStatus;
    }

    public setTaskStatus(taskStatus: boolean): void {
        this.taskStatus = taskStatus;
    }

    public getTaskCategoryId(): number {
        return this.taskCategoryId;
    }

    public setTaskCategoryId(taskCategoryId: number): void {
        this.taskCategoryId = taskCategoryId;
    }

}
