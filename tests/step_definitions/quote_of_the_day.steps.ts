import { InMemoryMessageRepository, InMemoryQuoteRepository } from '@adapters';
import { Message, Quote } from '@domain/models';
import { IMessageRepository } from '@domain/repositories';
import { IQuoteRepository } from '@domain/repositories/quote-repository.interface';
import { assert } from 'chai';
import { binding, given, then, when } from 'cucumber-tsflow';
import { ShareQuote, GetQuoteOfTheDay } from 'usecases';
import { RepositoriesFactory } from '@factories';
import * as moment from 'moment';

@binding()
export class QuoteOfTheDaySteps {
  private quoteRepository: IQuoteRepository;
  private quote: Quote;
  private messageRepository: IMessageRepository;
  private hour: number;
  private startHour: number;
  private endHour: number;
  private isGoodTime: boolean;
  private getQuoteOfTheDay: GetQuoteOfTheDay;
  private shareQuote: ShareQuote;

  constructor() {
    this.quoteRepository = RepositoriesFactory.createQuoteRepository();
    this.messageRepository = RepositoriesFactory.createMessageRepository();
    this.getQuoteOfTheDay = new GetQuoteOfTheDay(this.quoteRepository);
    this.shareQuote = new ShareQuote(this.messageRepository);
  }

  @given(/The time parameters \"(\d+)\", \"(\d+)\" and \"(\d+)\"/)
  givenTimeParameters(currentHour: number, startHour: number, endHour: number) {
    this.hour = currentHour;
    this.startHour = startHour;
    this.endHour = endHour;
  }

  @given(/Time \"(\d+)\" is between \"(\d+)\" and \"(\d+)\"/)
  givenTimeIsBetween(currentHour: number, startHour: number, endHour: number) {
    this.isGoodTime = currentHour >= startHour && currentHour <= endHour;
  }

  @given('I have not shared a quote today')
  async givenIHaveNotSharedQuoteToday() {
    const todayMessage = await this.messageRepository.getTodayMessage();
    assert.isUndefined(todayMessage);
  }

  @when('I get the quote of the day')
  async thenIGetQuoteOfTheDay() {
    this.quote = await this.getQuoteOfTheDay.handle();
    assert.isDefined(this.quote);
  }

  @then('It shares it to the world')
  async thenSharesToTheWorld() {
    await this.shareQuote.handle(
      this.quote,
      this.hour,
      this.startHour,
      this.endHour
    );
    const message: Message = await this.messageRepository.getTodayMessage();
    assert.isDefined(message);
    assert.include(message.body, this.quote.content);
  }

  @then('Do not share the quote of the day')
  async thenDoNotShareQuoteOfTheDay() {
    try {
      await this.shareQuote.handle(
        this.quote,
        this.hour,
        this.startHour,
        this.endHour
      );
    } catch (err) {
      assert.match(
        err,
        /(Quote already shared today)|(Cannot share quote at this hour)/
      );
    }
  }

  @given(/Time \"(\d+)\" is not between \"(\d+)\" and \"(\d+)\"/)
  givenTimeIsNotBetween(
    currentHour: number,
    startHour: number,
    endHour: number
  ) {
    this.isGoodTime = currentHour < startHour || currentHour > endHour;
  }

  @given('I have shared a quote today')
  async givenIHaveSharedQuoteToday() {
    this.quote = await this.getQuoteOfTheDay.handle();
    await this.shareQuote.handle(
      this.quote,
      this.hour,
      this.startHour,
      this.endHour
    );
    const todayMessage: Message = await this.messageRepository.getTodayMessage();
    assert.isDefined(todayMessage);
    assert.equal(moment().diff(todayMessage.date, 'days'), 0);
  }
}
