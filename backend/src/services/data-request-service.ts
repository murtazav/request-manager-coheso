import { DataRequest } from "../types/data-request";
import { DB_ERROR_MESSAGE } from "../utils/constants";
import { addToCollection, deleteFromCollection, getByFilter, updateCollection } from "./db"

export const getDataRequest = async (userId: number) => {
    try {
        return await getByFilter("dataRequests", (item) => item.createdBy === userId);
    } catch (error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}

export const getDataRequestById = async (userId: number, requestId: number) => {
    try {
        return (await getByFilter("dataRequests", (item) => (item.createdBy === userId && item.id === requestId)))?.[0];
    } catch (error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}


export const createDataRequest = async (dataRequest: DataRequest) => {
    try {
        await addToCollection("dataRequests", {...dataRequest, id: Date.now(), createdAt: Date.now()});
    } catch(error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}

export const updateDataRequest = async (dataRequest: DataRequest, userId: number) => {
    try {
        await updateCollection("dataRequests", dataRequest, userId);
    } catch(error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}

export const deleteDataRequest = async (id: number, userId: number) => {
    try {
        await deleteFromCollection("dataRequests", id, userId);
    } catch(error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}
