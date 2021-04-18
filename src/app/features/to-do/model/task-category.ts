export class TaskCategory {


    private _id: number;

    private _name: string;

    private _description: string;

    private _creationTime: Date;

    private _modificationTime: Date;

    constructor() {

        this._id = 0;
        this._name = '';
        this._description = '';
        this._creationTime = new Date();
        this._modificationTime = new Date();

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


}
