import { User } from "../types/user";
import { DB_ERROR_MESSAGE } from "../utils/constants";
import { addToCollection, getByFilter } from "./db";

export const createUser = async (user: User): Promise<void> => {
    try {   
        await addToCollection("users", user);
    } catch (error) {
        console.error(error);
        throw Error(DB_ERROR_MESSAGE);    
    }
} 

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
        return (await getByFilter("users", (item) => item.email === email))?.[0];
    } catch (error) {
        throw Error(DB_ERROR_MESSAGE);
    }
}

