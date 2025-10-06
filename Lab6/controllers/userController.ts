import type { Request, Response, NextFunction } from 'express';
import userService from '../services/userService.js';
import { BadRequest } from '../utils/errors.js';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await userService.register(username, password);
      res.status(201).json(user);
    } catch (e) { next(e); }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      if (!username || !password) return next(new BadRequest('Données invalides'));
      const result = await userService.login(username, password);
      res.json(result);
    } catch (e) { next(e); }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(req.user);
    } catch (e) { next(e); }
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (e) { next(e); }
  }
}

export default new UserController();