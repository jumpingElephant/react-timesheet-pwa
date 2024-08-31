import {ITask} from './types';

export class Task implements ITask {
    private _id?: number;
    projectId: number;
    title?: string;
    start?: Date;
    end?: Date;

    constructor(projectId: number, id?: number, title?: string, start?: Date, end?: Date) {
        this._id = id;
        this.projectId = projectId;
        this.title = title;
        this.start = start;
        this.end = end;
    }

    get id(): number {
        if (this._id === undefined) {
            throw new Error("Task ID is undefined");
        }
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}