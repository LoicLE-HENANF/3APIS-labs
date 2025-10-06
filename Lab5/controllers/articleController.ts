import type { Request, Response, NextFunction } from 'express';
import { Controller } from './controller.js';
import { BadRequest } from '../utils/errors.js';
import articleService from '../services/articleService.js';
import { Article } from '../models/articleModel.js';

class ArticleController extends Controller {
    private readonly service;

    constructor(service = articleService) {
        super();
        this.service = service;
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const articles = await this.service.getAll();
            res.json(articles);
        } catch (e) {
            next(e);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) {
                return next(new BadRequest('ID is required'));
            }
            const article = await this.service.getById(id);
            res.json(article);
        } catch (e) {
            next(e);
        }
    }

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, price } = req.body;
            if (!name || !price) {
                return next(new BadRequest('Invalid data'));
            }
            const created = await this.service.add({ name, description, price });
            res.status(201).json(created);
        } catch (e) {
            next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, price } = req.body as {
                name?: string;
                description?: string;
                price?: number;
            };

            if (
                name === undefined &&
                description === undefined &&
                price === undefined
            ) {
                return next(new BadRequest('No data to update'));
            }

            const id = req.params.id;
            if (!id) {
                return next(new BadRequest('ID is required'));
            }

            const patch: Partial<Article> = {};
            if (name !== undefined) patch.name = name;
            if (description !== undefined) patch.description = description;
            if (price !== undefined) patch.price = price;

            const updated = await this.service.update(id, patch);
            res.json(updated);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) {
                return next(new BadRequest('ID is required'));
            }
            
            const deleted = await this.service.delete(id);
            res.json(deleted);
        } catch (e) {
            next(e);
        }
    }
}

export default new ArticleController();