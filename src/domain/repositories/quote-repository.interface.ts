import { Quote } from '../models/quote';

export interface IQuoteRepository {
  add: (quote: Quote) => Promise<void>;
  getAll(): Promise<Quote[]>;
  getById(id: string): Promise<Quote>;
}
