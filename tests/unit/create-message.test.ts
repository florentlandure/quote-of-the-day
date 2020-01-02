import { Message, Quote } from '@domain/models';
import { IMessageRepository, IQuoteRepository } from '@domain/repositories';
import { RepositoriesFactory } from '@factories';
import { CreateMessage } from '@usecases';
import { assert } from 'chai';

describe('Create message usecase', () => {
  let messageRepository: IMessageRepository;
  let createMessage: CreateMessage;
  let quoteRepository: IQuoteRepository;
  let quote: Quote;

  const assertMessageHasBeenShared = (messages: Message[]) => {
    assert.equal(messages.length, 1);
  };
  const assertSharedMessageIsValid = (quote: Quote, message: Message) => {
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
  };

  beforeEach(async () => {
    messageRepository = RepositoriesFactory.createMessageRepository();
    createMessage = new CreateMessage(messageRepository);
    quoteRepository = RepositoriesFactory.createQuoteRepository();
    quote = await quoteRepository.getTodayQuote();
  });

  it('should create a message from a quote', async () => {
    createMessage.handle(quote);
    const messages: Message[] = await messageRepository.getAll();
    const message = messages[0];
    assertMessageHasBeenShared(messages);
    assertSharedMessageIsValid(quote, message);
  });
});
