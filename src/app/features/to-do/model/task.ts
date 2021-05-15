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

    id: number;

    name: string;

    description: string;

    creationTime: Date;

    modificationTime: Date;

    taskStatus: number;

    categoryId: number;

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.creationTime = new Date();
        this.modificationTime = new Date();
        this.taskStatus = 0;
        this.categoryId = 0;
    }


}
