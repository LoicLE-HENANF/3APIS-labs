import type {NextFunction, Request, Response} from "express";
import {Forbidden} from "../utils/errors.js";

export function requireRole(roles: string[]) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const user = req.user;
        console.log(user);
        console.log(roles);
        if (!user || !user.roles || !roles.some(r => user.roles.includes(r))) {
            return next(new Forbidden('Accès refusé'));
        }
        next();
    };
}