import { UserService } from "../services";
import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/constants";
import jwt from "../lib/jwt";
import { User } from "../types";
import { AuthMiddleware } from "../middlewares";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user.passwordHashed !== password) {
            return res.status(401).send("Invalid password");
        }
        res.send({ user: { id: user.id, email }, token: jwt.sign({ id: user.id, email }) });
    } catch (error) {
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserService.getUserByEmail(email);
        if (user) {
            return res.status(409).send("User already exists");
        }
        const newUser = {  id: Date.now(), name, email, passwordHashed: password, createdAt: Date.now() };
        await UserService.createUser(newUser);
        const token = jwt.sign({ id: newUser.id, email });
        console.log(token)
        res.send({ token, user: { id: newUser.id, email } });
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}

export const me = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    const user = req.user as User;
    res.send({ id: user.id, email: user.email });
}