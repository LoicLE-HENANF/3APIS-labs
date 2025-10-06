import { Model } from './model.js';
import { NotFound } from '../utils/errors.js';

export class Article {
  public id: string;
  public name: string;
  public description: string | undefined;
  public price: number;

  constructor(id: string, name: string, description: string | undefined, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

export class ArticleModel extends Model<Article, string> {
  private articles: Article[] = [];

  async getAll(): Promise<Article[]> {
    return this.articles;
  }

  async getById(id: string): Promise<Article> {
    const article = this.articles.find(a => a.id === id);
    if (!article) throw new NotFound('Article not found');
    return article;
  }

  async add(data: Omit<Article, "id">): Promise<Article> {
    const article = new Article(
        new Date().valueOf().toString(),
        data.name,
        data.description,
        data.price
    );
    this.articles.push(article);
    return article;
  }

  async update(
      id: string,
      patch: Partial<Article>
  ): Promise<Article> {
    const idx = this.articles.findIndex(a => a.id === id);
    if (idx === -1) throw new NotFound('Article not found');
    const current = this.articles[idx];
    if (!current) throw new NotFound('Article not found');
    const updated = new Article(
        current.id,
        patch.name ?? current.name,
        patch.description !== undefined ? patch.description : current.description,
        patch.price !== undefined ? patch.price : current.price
    );
    this.articles[idx] = updated;
    return updated;
  }

  async delete(id: string): Promise<Article> {
    const idx = this.articles.findIndex(a => a.id === id);
    if (idx === -1) throw new NotFound('Article not found');
    const [removed] = this.articles.splice(idx, 1);
    if (!removed) throw new NotFound('Article not found');
    return removed;
  }
}

const articleModel = new ArticleModel();
export default articleModel;