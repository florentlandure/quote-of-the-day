import { Quote, Message } from '@domain/models';
import { IMessageRepository } from '@domain/repositories';

export class ShareQuote {
  constructor(private messageRepository: IMessageRepository) {}

  async handle(
    quote: Quote,
    hour: number,
    startHour: number,
    endHour: number
  ): Promise<void> {
    const message: Message = this.createMessageFromQuote(quote);
    if (!this.canShareQuoteAtHour(hour, startHour, endHour))
      throw 'Cannot share quote at this hour';
    if (await this.hasAlreadySharedQuoteToday())
      throw 'Quote already shared today';
    await this.messageRepository.add(message);
  }

  private canShareQuoteAtHour(
    hour: number,
    startHour: number,
    endHour: number
  ): boolean {
    return hour >= startHour && hour <= endHour;
  }

  private async hasAlreadySharedQuoteToday(): Promise<boolean> {
    return !!(await this.messageRepository.getTodayMessage());
  }

  private createMessageFromQuote(quote: Quote): Message {
    if (!quote) throw 'Quote is undefined';
    return new Message(
      quote.id,
      quote.content,
      quote.author,
      quote.tags,
      quote.provider
    );
  }
}
