import {DBSchema, IDBPDatabase, IDBPObjectStore, openDB} from 'idb';
import {Task} from "../models/Task";
import {Project} from "../models/Project";

interface TasksDB extends DBSchema {
    tasks: {
        value: Task;
        key: number;
    };
    projects: {
        value: Project;
        key: number;
    };
}

export const DB_NAME = 'tasksDB';
export const DB_VERSION = 1;
export const TASKS_STORE_NAME = 'tasks';
export const PROJECTS_STORE_NAME = 'projects';

export const initDb = async (): Promise<IDBPDatabase<TasksDB>> => {
    return openDB<TasksDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(PROJECTS_STORE_NAME)) {
                db.createObjectStore(PROJECTS_STORE_NAME, {keyPath: 'id', autoIncrement: true});
            }
            if (!db.objectStoreNames.contains(TASKS_STORE_NAME)) {
                db.createObjectStore(TASKS_STORE_NAME, {keyPath: 'id', autoIncrement: true});
            }
        }
    });
};

export const executeTransaction = async <T>(
    storeName: 'tasks' | 'projects',
    mode: 'readonly' | 'readwrite',
    callback: (store: IDBPObjectStore<TasksDB, ['tasks' | 'projects'], 'tasks' | 'projects', 'readonly' | 'readwrite'>) => Promise<T>
): Promise<T> => {
    const db = await initDb();
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const result = await callback(store);
    await tx.done;
    return result;
};