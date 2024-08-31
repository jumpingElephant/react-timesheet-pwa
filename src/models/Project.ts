import {IProject} from './types';

export class Project implements IProject {
    private _id?: number;
    name: string;

    constructor(name: string, id?: number) {
        this.name = name;
        this._id = id;
    }

    get id(): number {
        if (this._id === undefined) {
            throw new Error("Project ID is undefined");
        }
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}