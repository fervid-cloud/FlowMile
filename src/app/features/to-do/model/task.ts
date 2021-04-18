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
export class Task {

    private _id: number;

    private _name: string;

    private _description: string;

    private _creationTime: Date;

    private _modificationTime: Date;

    private _taskStatus: number;

    private _categoryId: number;

    constructor() {

        this._id = 0;
        this._name = "";
        this._description = "";
        this._creationTime = new Date();
        this._modificationTime = new Date();
        this._taskStatus = 0;
        this._categoryId = 0;

    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get creationTime(): Date {
        return this._creationTime;
    }

    set creationTime(value: Date) {
        this._creationTime = value;
    }

    get modificationTime(): Date {
        return this._modificationTime;
    }

    set modificationTime(value: Date) {
        this._modificationTime = value;
    }

    get taskStatus(): number {
        return this._taskStatus;
    }

    set taskStatus(value: number) {
        this._taskStatus = value;
    }

    get categoryId(): number {
        return this._categoryId;
    }

    set categoryId(value: number) {
        this._categoryId = value;
    }

}
