import express from 'express';
import articleController from '../../controllers/articleController.js';
import {requireRole} from "../../middlewares/roleMiddleware.js";

const router = express.Router();

router.get('/', (
    req, 
    res, 
    next) => 
    articleController.getAll(req, res, next)
);

router.get('/:id',(req, res, next) => articleController.getById(req, res, next));

router.post('/', requireRole(['ADMIN']), (req, res, next) => articleController.add(req, res, next));

router.put('/:id', (req, res, next) => articleController.update(req, res, next));

router.delete('/:id', (req, res, next) => articleController.delete(req, res, next));

export default router;