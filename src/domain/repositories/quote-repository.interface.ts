import { Quote } from '../models/quote';

export interface IQuoteRepository {
  getTodayQuote(): Promise<Quote>;
}
