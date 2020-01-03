import { Quote } from '@domain/models';
import { IQuoteRepository } from '@domain/repositories';

export class GetQuoteOfTheDay {
  constructor(private quoteRepository: IQuoteRepository) {}

  handle(): Promise<Quote> {
    return this.quoteRepository.getTodayQuote();
  }
}
