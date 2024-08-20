import {openDB} from 'idb';

const DB_NAME = 'tasksDB';
const STORE_NAME = 'tasks';

const initialTasks = [
    {title: 'Task 1', start: new Date('2023-10-01T08:00:00'), end: new Date('2023-10-01T10:00:00')},
    {title: 'Task 2', start: new Date('2023-10-01T11:00:00'), end: new Date('2023-10-01T12:00:00')},
    {title: 'Task 3', start: new Date('2023-10-01T13:00:00'), end: new Date('2023-10-01T15:00:00')},
];

const initDb = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true});
            }
        },
    });
};

export const saveTasksToIndexedDb = async (tasks) => {
    const db = await initDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    for (const task of tasks) {
        await tx.objectStore(STORE_NAME).put(task);
    }
    await tx.done;
};

export const loadTasksFromIndexedDb = async () => {
    const db = await initDb();
    return db.getAll(STORE_NAME);
};

export const deleteTaskFromIndexedDbById = async (taskId) => {
    const db = await initDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).delete(taskId);
    await tx.done;
};

export const initializeTasksInIndexedDb = async () => {
    const db = await initDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    if ((await tx.objectStore(STORE_NAME).getAll()).length === 0) {
        console.log('No tasks found in IndexedDB, initializing with default tasks...');
        for (const task of initialTasks) {
            await tx.objectStore(STORE_NAME).put(task);
        }
        await tx.done;
    }
};