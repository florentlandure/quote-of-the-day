import { IQuoteRepository } from '@domain/repositories';
import { Quote } from '@domain/models/quote';

export class InMemoryQuoteRepository implements IQuoteRepository {
  async getTodayQuote(): Promise<Quote> {
    return new Quote(
      'DpEEVUKSlOEe3_PkAuAm_geF',
      'Without art, the crudeness of reality would make the world unbearable.',
      'George Bernard Shaw',
      ['art', 'reality'],
      'theysaidso.com'
    );
  }
}
