import {IProject, ITask} from "../models/types";
import {initDb, PROJECTS_STORE_NAME, TASKS_STORE_NAME} from "../utils/dbUtils";
import {Project} from "../models/Project";
import {Task} from "../models/Task";

export const initialProjects: Omit<IProject, 'id'>[] = [
    {name: 'Project 1'},
    {name: 'Project 2'},
    {name: 'Project 3'}
];

export const initialTasks: Omit<ITask, 'id'>[] = [
    {title: 'Task 1', projectId: 1, start: new Date('2023-10-01T08:00:00'), end: new Date('2023-10-01T10:00:00')},
    {title: 'Task 2', projectId: 2, start: new Date('2023-10-01T11:00:00'), end: new Date('2023-10-01T12:00:00')},
    {title: 'Task 3', projectId: 3, start: new Date('2023-10-01T13:00:00'), end: new Date('2023-10-01T15:00:00')},
];

export const initializeObjectStoresInIndexedDb = async (): Promise<void> => {
    const db = await initDb();
    try {
        await db.transaction([PROJECTS_STORE_NAME, TASKS_STORE_NAME], 'readwrite').done;
    } catch (error) {
        console.error('Failed to initialize object stores in IndexedDB', error);
        throw error;
    }
};

export const populateInitialData = async (): Promise<void> => {
    const db = await initDb();
    try {
        // Clear and populate projects store
        {
            const tx = db.transaction(PROJECTS_STORE_NAME, 'readwrite');
            const projectsStore = tx.objectStore(PROJECTS_STORE_NAME);
            await projectsStore.clear(); // Clear the store before populating
            for (const projectData of initialProjects) {
                const project = new Project(projectData.name);
                await projectsStore.put(project);
            }
            await tx.done;
        }
        // Clear and populate tasks store
        {
            const tx = db.transaction(TASKS_STORE_NAME, 'readwrite');
            const tasksStore = tx.objectStore(TASKS_STORE_NAME);
            await tasksStore.clear(); // Clear the store before populating
            for (const taskData of initialTasks) {
                const task = new Task(taskData.projectId, undefined, taskData.title, taskData.start, taskData.end);
                await tasksStore.put(task);
            }
            await tx.done;
        }
    } catch (error) {
        console.error('Failed to populate initial data in IndexedDB', error);
        throw error;
    }
};