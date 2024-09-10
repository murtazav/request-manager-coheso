import { DataRequest } from "../types/data-request";
import { DB_ERROR_MESSAGE } from "../utils/constants";
import { addToCollection, getByFilter, updateCollection } from "./db"

export const getDataRequest = async (userId: number) => {
    try {
        return await getByFilter("dataRequests", (item) => item.userId === userId);
    } catch (error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}

export const createDataRequest = async (dataRequest: DataRequest) => {
    try {
        await addToCollection("dataRequests", dataRequest);
    } catch(error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}

export const updateDataRequest = async (dataRequest: DataRequest) => {
    try {
        await updateCollection("dataRequests", dataRequest);
    } catch(error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);
    }
}