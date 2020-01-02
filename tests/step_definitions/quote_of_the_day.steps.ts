import { HttpQuoteRepository, InMemoryMessageRepository } from '@adapters';
import { Message, Quote } from '@domain/models';
import { IMessageRepository } from '@domain/repositories';
import { IQuoteRepository } from '@domain/repositories/quote-repository.interface';
import { assert } from 'chai';
import { binding, given, then, when } from 'cucumber-tsflow';
import { CreateMessage } from 'usecases';

@binding()
export class QuoteOfTheDaySteps {
  private quoteRepository: IQuoteRepository;
  private quote: Quote;
  private messageRepository: IMessageRepository;

  constructor() {
    this.quoteRepository = new HttpQuoteRepository();
    this.messageRepository = new InMemoryMessageRepository();
  }

  @given('I have the quote of the day')
  async givenIHaveTheQuoteOfTheDay() {
    this.quote = await this.quoteRepository.getTodayQuote();
    assert.isDefined(this.quote.id);
    assert.isDefined(this.quote.content);
  }

  @when('It creates a message from the quote')
  whenGetQuoteOfTheDay() {
    const createMessage = new CreateMessage(this.messageRepository);
    createMessage.handle(this.quote);
  }

  @then('It is shared to the world')
  async thenIsSharedToTheWorld() {
    const messages: Message[] = await this.messageRepository.getAll();
    assert.equal(messages.length, 1);
  }
}
