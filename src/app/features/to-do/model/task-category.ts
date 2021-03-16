export class TaskCategory {

    private categoryId: number;

    private categoryTitle: string;

    private categoryDescription: string;

    private taskCount: number;



    private creationTime: Date;

    private modifiedTime: Date;

    constructor() {

        this.categoryId = 0;
        this.categoryTitle = "";
        this.categoryDescription = "";
        this.taskCount = 0;
        this.creationTime = new Date();
        this.modifiedTime = new Date();

    }

    public getCategoryId(): number {
        return this.categoryId;
    }

    public setCategoryId(categoryId: number): void {
        this.categoryId = categoryId;
    }

    public getCategoryTitle(): string {
        return this.categoryTitle;
    }

    public setCategoryTitle(categoryTitle: string): void {
        this.categoryTitle = categoryTitle;
    }

    public getCategoryDescription(): string {
        return this.categoryDescription;
    }

    public setCategoryDescription(categoryDescription: string): void {
        this.categoryDescription = categoryDescription;
    }

    public getCreationTime(): Date {
        return this.creationTime;
    }

    public setCreationTime(creationTime: Date): void {
        this.creationTime = creationTime;
    }


    public getTaskCount(): number {
        return this.taskCount;
    }

    public setTaskCount(taskCount: number): void {
        this.taskCount = taskCount;
    }

    public getModifiedTime(): Date {
        return this.modifiedTime;
    }

    public setModifiedTime(modifiedTime: Date): void {
        this.modifiedTime = modifiedTime;
    }


}