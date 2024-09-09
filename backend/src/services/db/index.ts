import path from "path";
const dataFilePath = path.join(__dirname, 'db.json');
import { promises as fs } from 'fs';

export type Collection = 'users' | 'requests' | 'requestTypes';

export const readData = async (collection: Collection) => {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data)[collection];
};

export const addToCollection = async (collection: Collection, item: any) => {
    const data: any = await fs.readFile(dataFilePath, 'utf-8');
    const parsedData = JSON.parse(data);
    parsedData[collection].push(item);
    await fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2));
}

export const updateCollection = async (collection: Collection, item: any) => {
    const data: any = await fs.readFile(dataFilePath, 'utf-8');
    const index = data[collection].findIndex((i: any) => i.id === item.id);
    data[collection][index] = item;
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export const deleteFromCollection = async (collection: Collection, id: number) => {
    const data: any = await fs.readFile(dataFilePath, 'utf-8');
    data[collection] = data[collection].filter((i: any) => i.id !== id);
    await fs.writeFile(dataFilePath, JSON.stringify({ [collection]: data }, null, 2));
}

export const getByFilter = async (collection: Collection, filter: (item: any) => boolean) => {
    const data = await readData(collection);
    return data.filter(filter);
}