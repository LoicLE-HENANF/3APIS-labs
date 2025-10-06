import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  name: string;
  description?: string;
  price: number;
}

const ArticleSchema = new Schema<IArticle>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
}, { timestamps: true });

export const ArticleModel = mongoose.model<IArticle>('Article', ArticleSchema);