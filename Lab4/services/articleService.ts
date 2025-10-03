import { Service } from './service.js';
import articleModel from '../models/articleModel.js';
import type { Article } from '../models/articleModel.js';

class ArticleService extends Service<Article, string> {
  private readonly model;

  constructor(model = articleModel) {
    super();
    this.model = model;
  }

  getAll(): Promise<Article[]> {
    return this.model.getAll();
  }

  getById(id: string): Promise<Article> {
    return this.model.getById(id);
  }

  add(data: Omit<Article, "id">): Promise<Article> {
    return this.model.add(data);
  }

  update(id: string, patch: Partial<Article>): Promise<Article> {
    return this.model.update(id, patch);
  }

  delete(id: string): Promise<Article> {
    return this.model.delete(id);
  }
}

export default new ArticleService();