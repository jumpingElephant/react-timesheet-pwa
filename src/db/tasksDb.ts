import {Task} from "../models/Task";
import {executeTransaction, TASKS_STORE_NAME} from "../utils/dbUtils";

export const saveTasksToIndexedDb = async (tasks: Task[]): Promise<void> => {
    await executeTransaction(
        TASKS_STORE_NAME,
        'readwrite',
        async (store) => {
            const promises = tasks.map(task => {
                if (store.put) {
                    return store.put(task);
                } else {
                    throw new Error("The put method is not available in readwrite mode.");
                }
            });
            await Promise.all(promises);
        }
    );
};

export const loadTasksFromIndexedDb = async (): Promise<Task[]> => {
    return executeTransaction<Task[]>(
        TASKS_STORE_NAME,
        'readonly',
        async (store) => {
            const tasks = await store.getAll();
            return tasks as Task[];
        }
    );
};

export const deleteTaskFromIndexedDbById = async (taskId: number): Promise<void> => {
    await executeTransaction(
        TASKS_STORE_NAME,
        'readwrite',
        async (store) => {
            if (store.delete) {
                await store.delete(taskId);
            } else {
                throw new Error("The delete method is not available in readwrite mode.");
            }
        }
    );
};