import {Project} from "../models/Project";
import {executeTransaction, PROJECTS_STORE_NAME} from "../utils/dbUtils";

export const saveProjectsToIndexedDb = async (projects: Project[]): Promise<void> => {
    await executeTransaction(
        PROJECTS_STORE_NAME,
        'readwrite',
        async (store) => {
            const promises = projects.map(project => {
                if (store.put) {
                    return store.put(project);
                } else {
                    throw new Error("The put method is not available in readwrite mode.");
                }
            });
            await Promise.all(promises);
        }
    );
};

export const loadProjectsFromIndexedDb = async (): Promise<Project[]> => {
    return executeTransaction<Project[]>(
        PROJECTS_STORE_NAME,
        'readonly',
        async (store) => {
            const projects = await store.getAll();
            return projects as Project[];
        }
    );
};

export const deleteProjectFromIndexedDbById = async (projectId: number): Promise<void> => {
    await executeTransaction(
        PROJECTS_STORE_NAME,
        'readwrite',
        async (store) => {
            if (store.delete) {
                await store.delete(projectId);
            } else {
                throw new Error("The delete method is not available in readwrite mode.");
            }
        }
    );
};