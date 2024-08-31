export interface IProject {
    id?: number;
    name: string;
}

export interface ITask {
    id?: number;
    projectId: number;
    title?: string;
    start?: Date;
    end?: Date;
}
