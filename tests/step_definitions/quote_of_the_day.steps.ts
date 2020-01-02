import { InMemoryMessageRepository, InMemoryQuoteRepository } from '@adapters';
import { Message, Quote } from '@domain/models';
import { IMessageRepository } from '@domain/repositories';
import { IQuoteRepository } from '@domain/repositories/quote-repository.interface';
import { assert } from 'chai';
import { binding, given, then, when } from 'cucumber-tsflow';
import { CreateMessage, GetQuoteOfTheDay } from 'usecases';
import { RepositoriesFactory } from '@factories';

@binding()
export class QuoteOfTheDaySteps {
  private quoteRepository: IQuoteRepository;
  private quote: Quote;
  private messageRepository: IMessageRepository;
  private hour: number;

  constructor() {
    this.quoteRepository = RepositoriesFactory.createQuoteRepository();
    this.messageRepository = RepositoriesFactory.createMessageRepository();
  }

  @given(/Time \"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})\" is between 8am and 10am/)
  async givenItIsTime(currentTime: string) {
    this.hour = new Date(currentTime).getHours();
  }

  @when('I get the quote of the day')
  async thenDispatchAction() {
    this.quote = await new GetQuoteOfTheDay(this.quoteRepository).handle(
      this.hour
    );
  }

  @then('It should be available to me')
  thenItShouldBeAvailable() {
    if (this.hour >= 8 && this.hour <= 10) {
      assert.isDefined(this.quote);
    }
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
