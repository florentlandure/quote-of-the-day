import { IMessageRepository } from '@domain/repositories';
import { InMemoryMessageRepository } from '@adapters';
import { Quote, Message } from '@domain/models';
import { CreateMessage } from '@usecases';
import { assert } from 'chai';

describe('Create message usecase', () => {
  let messageRepository: IMessageRepository;
  let createMessage: CreateMessage;
  let quote: Quote;

  beforeEach(() => {
    messageRepository = new InMemoryMessageRepository();
    createMessage = new CreateMessage(messageRepository);
    quote = new Quote(
      'W5EcObayalp77mj4P2T28AeF',
      'Do not let what you cannot do interfere with what you can do.',
      'John Wooden',
      ['inspire', 'ability'],
      'theysaidso.com'
    );
  });

  it('should create a message from a quote', async () => {
    createMessage.handle(quote);
    const messages: Message[] = await messageRepository.getAll();
    const message = messages[0];
    assert.equal(messages.length, 1);
    assert.equal(
      message.body,
      new Message(
        quote.id,
        quote.content,
        quote.author,
        quote.tags,
        quote.provider
      ).body
    );
  });
});
