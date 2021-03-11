


/* The definite assignment assertion is a feature that allows a! to be placed after instance property
and variable declarations to relay to TypeScript that a variable is indeed assigned for all intents
and purposes, even if TypeScript’s analyses cannot detect so. */

export class ToDoTask {

    private todoId!: number;

    private title!: string;

    private textContent!: string;

    private creationTime!: Date;

    private updationTime!: Date;

    private taskStatus!: boolean;

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

    public getUpdationTime(): Date {
        return this.updationTime;
    }

    public setUpdationTime(updationTime: Date): void {
        this.updationTime = updationTime;
    }

    public getTaskStatus(): boolean {
        return this.taskStatus;
    }

    public setTaskStatus(taskStatus: boolean): void {
        this.taskStatus = taskStatus;
    }

}
