import path from "path";
const dataFilePath = path.join(__dirname, 'db.json');
import { promises as fs } from 'fs';

export type Collection = 'users' | 'dataRequests' | 'requestTypes';

const getAllData = async () => {
    const rawData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(rawData);
}

export const readData = async (collection: Collection) => {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data)[collection];
};

export const addToCollection = async (collection: Collection, item: any) => {
    const data = await getAllData();
    data[collection].push(item);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export const updateCollection = async (collection: Collection, item: any, userId: number) => {
    const data = await getAllData();
    const index = data[collection].findIndex((i: any) => i.id === item.id && i.createdBy === userId);
    if(index === -1) throw Error('Item not found');
    data[collection][index] = {
        ...data[collection][index],
        ...item
    };
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export const deleteFromCollection = async (collection: Collection, id: number, userId: number) => {
    const data = await getAllData();
    data[collection] = data[collection].filter((i: any) => i.id !== id && i.createdBy === userId);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export const getByFilter = async (collection: Collection, filter: (item: any) => boolean) => {
    const data = await readData(collection);
    return data.filter(filter);
}