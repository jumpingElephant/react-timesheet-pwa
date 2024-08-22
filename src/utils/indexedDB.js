import {openDB} from 'idb';

const DB_NAME = 'tasksDB';
const DB_VERSION = 1;

const TASKS_STORE_NAME = 'tasks';
const PROJECTS_STORE_NAME = 'projects';

const initialProjects = [
    {name: 'Project 1'},
    {name: 'Project 2'},
    {name: 'Project 3'}
];

const initialTasks = [
    {title: 'Task 1', projectId: 1, start: new Date('2023-10-01T08:00:00'), end: new Date('2023-10-01T10:00:00')},
    {title: 'Task 2', projectId: 2, start: new Date('2023-10-01T11:00:00'), end: new Date('2023-10-01T12:00:00')},
    {title: 'Task 3', projectId: 3, start: new Date('2023-10-01T13:00:00'), end: new Date('2023-10-01T15:00:00')},
];

const initDb = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            console.log('foo')
            if (!db.objectStoreNames.contains(PROJECTS_STORE_NAME)) {
                db.createObjectStore(PROJECTS_STORE_NAME, {keyPath: 'id', autoIncrement: true});
            }
            if (!db.objectStoreNames.contains(TASKS_STORE_NAME)) {
                db.createObjectStore(TASKS_STORE_NAME, {keyPath: 'id', autoIncrement: true});
            }
        },
    });
};

export const saveTasksToIndexedDb = async (tasks) => {
    const db = await initDb();
    const tx = db.transaction(TASKS_STORE_NAME, 'readwrite');
    try {
        for (const task of tasks) {
            await tx.objectStore(TASKS_STORE_NAME).put(task);
        }
        await tx.done;
    } catch (error) {
        console.error('Failed to save tasks to IndexedDB', error);
        throw error; // rethrow the error after logging
    }
};

export const saveProjectsToIndexedDb = async (projects) => {
    const db = await initDb();
    const tx = db.transaction(PROJECTS_STORE_NAME, 'readwrite');
    try {
        for (const project of projects) {
            await tx.objectStore(PROJECTS_STORE_NAME).put(project);
        }
        await tx.done;
    } catch (error) {
        console.error('Failed to save projects to IndexedDB', error);
        throw error; // rethrow the error after logging
    }
};

export const loadTasksFromIndexedDb = async () => {
    const db = await initDb();
    try {
        return await db.getAll(TASKS_STORE_NAME);
    } catch (error) {
        console.error('Failed to load tasks from IndexedDB', error);
        throw error; // rethrow the error after logging
    }
};

export const loadProjectsFromIndexedDb = async () => {
    const db = await initDb();
    try {
        return await db.getAll(PROJECTS_STORE_NAME);
    } catch (error) {
        console.error('Failed to load projects from IndexedDB', error);
        throw error; // rethrow the error after logging
    }
};

export const deleteTaskFromIndexedDbById = async (taskId) => {
    const db = await initDb();
    const tx = db.transaction(TASKS_STORE_NAME, 'readwrite');
    try {
        await tx.objectStore(TASKS_STORE_NAME).delete(taskId);
        await tx.done;
    } catch (error) {
        console.error(`Failed to delete task with ID ${taskId} from IndexedDB`, error);
        throw error; // rethrow the error after logging
    }
};

export const deleteProjectFromIndexedDbById = async (projectId) => {
    const db = await initDb();
    const tx = db.transaction(PROJECTS_STORE_NAME, 'readwrite');
    try {
        await tx.objectStore(PROJECTS_STORE_NAME).delete(projectId);
        await tx.done;
    } catch (error) {
        console.error(`Failed to delete project with ID ${projectId} from IndexedDB`, error);
        throw error; // rethrow the error after logging
    }
};

export const initializeObjectStoresInIndexedDb = async () => {
    const db = await initDb();

    try {
        {// Initialize projects store
            const tx = db.transaction(PROJECTS_STORE_NAME, 'readwrite');
            const projectsStore = tx.objectStore(PROJECTS_STORE_NAME);
            if ((await projectsStore.getAll()).length === 0) {
                for (const project of initialProjects) {
                    await projectsStore.put(project);
                }
            }
            await tx.done;
        }
        {// Initialize tasks store
            const tx = db.transaction(TASKS_STORE_NAME, 'readwrite');
            const tasksStore = tx.objectStore(TASKS_STORE_NAME);
            if ((await tasksStore.getAll()).length === 0) {
                for (const task of initialTasks) {
                    await tasksStore.put(task);
                }
            }
            await tx.done;
        }
    } catch (error) {
        console.error('Failed to initialize object stores in IndexedDB', error);
        throw error; // rethrow the error after logging
    }
};