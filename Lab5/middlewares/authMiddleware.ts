import type { Request, Response, NextFunction } from 'express';
import { Unauthorized, Forbidden } from '../utils/errors.js';
import { verifyJwt } from '../utils/jwt.js';

export function authGuard(req: Request, _res: Response, next: NextFunction) {
  const header = req.get('authorization');
  if (!header || !header.startsWith('Bearer ')) {
    return next(new Unauthorized('Token manquant'));
  }
  const token = header.substring(7);
  try {
    const payload: any = verifyJwt(token);
    req.user = {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles || []
    };
    next();
  } catch {
    next(new Unauthorized('Token invalide'));
  }
}