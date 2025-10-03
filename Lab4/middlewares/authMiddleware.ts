import type { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../utils/errors.js';

export function authGuard(req: Request, _res: Response, next: NextFunction) {
    const auth = req.get('authorization');
    if (auth !== 'user') {
        return next(new Unauthorized('Invalid authorization header'));
    }
    next();
}