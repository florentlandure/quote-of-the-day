import { IQuoteRepository } from '@domain/repositories';
import { Quote } from '@domain/models/quote';

export class InMemoryQuoteRepository implements IQuoteRepository {
  private quotes: Quote[] = [];

  async add(quote: Quote): Promise<void> {
    this.quotes.push(quote);
  }

  async getAll(): Promise<Quote[]> {
    return this.quotes;
  }

  async getById(id: string): Promise<Quote> {
    return this.quotes.find(quote => quote.id === id);
  }
}
