import { TaskStatus } from "../enum/TaskStatus";

export interface Todo {

    todoId: number;

    title: string;

    contentText: string;

    creationTime: Date;

    updationTime: Date;

    taskStatus: TaskStatus;

}