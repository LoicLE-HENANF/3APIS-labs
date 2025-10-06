import {Service} from './service.js';
import {ArticleModel, IArticle} from '../models/articleModel.js';

class ArticleService extends Service<IArticle> {
  async getAll(): Promise<IArticle[]> {
    return ArticleModel.find();
  }

  async getById(id: string): Promise<IArticle | null> {
    return ArticleModel.findById(id);
  }

  async add(data: Partial<IArticle>): Promise<IArticle> {
    return await ArticleModel.create(data)
  }

  async update(id: string, patch: Partial<IArticle>): Promise<IArticle | null> {
    return ArticleModel.findByIdAndUpdate(id, patch, { new: true });
  }

  async delete(id: string): Promise<IArticle | null> {
    return ArticleModel.findByIdAndDelete(id);
  }

  async getAllFiltered(options: {
    sort?: Record<string, 'asc' | 'desc'>;
    page?: number;
    limit?: number;
  }): Promise<{ articles: IArticle[]; total: number; page: number; limit: number }> {
    const { sort = {}, page = 1, limit = 10 } = options;

    // Conversion du tri pour Mongoose
    const sortQuery: Record<string, 1 | -1> = {};
    Object.entries(sort).forEach(([field, order]) => {
      sortQuery[field] = order === 'asc' ? 1 : -1;
    });

    const skip = (page - 1) * limit;

    // Exécuter les requêtes en parallèle
    const [articles, total] = await Promise.all([
      ArticleModel.find()
          .sort(sortQuery)
          .skip(skip)
          .limit(limit),
      ArticleModel.countDocuments()
    ]);

    return {
      articles,
      total,
      page,
      limit
    };
  }
}

export default new ArticleService();