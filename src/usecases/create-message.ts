import { Quote, Message } from '@domain/models';
import { IMessageRepository } from '@domain/repositories';

export class CreateMessage {
  constructor(private messageRepository: IMessageRepository) {}

  handle(quote: Quote): Promise<void> {
    const message: Message = new Message(
      quote.id,
      quote.content,
      quote.author,
      quote.tags,
      quote.provider
    );
    return this.messageRepository.add(message);
  }
}
