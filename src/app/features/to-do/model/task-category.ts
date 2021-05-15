export class TaskCategory {

    id: number;

    name: string;

    description: string;

    creationTime: Date;

    modificationTime: Date;

    constructor() {

        this.id = 0;
        this.name = '';
        this.description = '';
        this.creationTime = new Date();
        this.modificationTime = new Date();

    }




}
