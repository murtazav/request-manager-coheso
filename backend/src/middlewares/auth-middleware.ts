import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from '../utils/constants';
import jwt from '../lib/jwt';
import { User } from '../types';

export interface CustomRequest extends Request {
    user?: User;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        // Verify token
        const decoded = jwt.verify(token);
        
        // Attach user to request
        req.user = decoded.user;
        next();
    }
    catch (error) {
        res.status(401).send(UNAUTHORIZED);
    }
}
