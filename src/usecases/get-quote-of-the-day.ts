import { Quote } from '@domain/models';
import { IQuoteRepository } from '@domain/repositories';

export class GetQuoteOfTheDay {
  constructor(private quoteRepository: IQuoteRepository) {}

  handle(currentHour: number): Promise<Quote> {
    return this.canGetQuote(currentHour)
      ? this.quoteRepository.getTodayQuote()
      : undefined;
  }

  private canGetQuote(currentHour: number): boolean {
    return currentHour >= 8 && currentHour <= 10;
  }
}
