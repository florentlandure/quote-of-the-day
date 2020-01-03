import { Message, Quote } from '@domain/models';
import { IMessageRepository, IQuoteRepository } from '@domain/repositories';
import { RepositoriesFactory } from '@factories';
import { ShareQuote } from '@usecases';
import { assert } from 'chai';

describe('Share quote usecase', () => {
  let messageRepository: IMessageRepository;
  let shareQuote: ShareQuote;
  let quoteRepository: IQuoteRepository;
  let quote: Quote;
  let hour: number;
  let startHour: number;
  let endHour: number;

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
    shareQuote = new ShareQuote(messageRepository);
    quoteRepository = RepositoriesFactory.createQuoteRepository();
    quote = await quoteRepository.getTodayQuote();
    hour = 9;
    startHour = 8;
    endHour = 22;
  });

  it('should share a quote when time is between 8am and 10pm', async () => {
    await shareQuote.handle(quote, hour, startHour, endHour);
    const message: Message = await messageRepository.getTodayMessage();
    assertSharedMessageIsValid(quote, message);
  });

  it('should not share a quote when time is not between 8am and 10pm', async () => {
    hour = 23;
    try {
      await shareQuote.handle(quote, hour, startHour, endHour);
    } catch (err) {
      assert.equal(err, 'Cannot share quote at this hour');
    }
  });

  it('should throw an error if quote is undefined', async () => {
    try {
      await shareQuote.handle(undefined, hour, startHour, endHour);
    } catch (err) {
      assert.equal(err, 'Quote is undefined');
    }
  });

  it('should not share a quote twice the same day', async () => {
    await shareQuote.handle(quote, hour, startHour, endHour);
    const firstMessage: Message = await messageRepository.getTodayMessage();
    assert.isDefined(firstMessage);
    try {
      await shareQuote.handle(quote, hour, startHour, endHour);
    } catch (err) {
      assert.equal(err, 'Quote already shared today');
    }
  });
});
