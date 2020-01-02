import { binding, given, when, then } from 'cucumber-tsflow';
import { assert } from 'chai';
import { Quote, Message } from '@domain/models';
import { TableDefinition } from 'cucumber';
import { IQuoteRepository } from '@domain/repositories/quote-repository.interface';
import { InMemoryQuoteRepository, InMemoryMessageRepository } from '@adapters';
import { CreateMessage } from 'usecases';
import { IMessageRepository } from '@domain/repositories';

@binding()
export class QuoteOfTheDaySteps {
  private quoteRepository: IQuoteRepository;
  private quote: Quote;
  private messageRepository: IMessageRepository;

  constructor() {
    this.quoteRepository = new InMemoryQuoteRepository();
    this.messageRepository = new InMemoryMessageRepository();
  }

  @given('Some quotes exist:')
  givenSomeQuotesExist(tableDef: TableDefinition) {
    tableDef.hashes().forEach(row => {
      const quote: Quote = new Quote(
        row.id,
        row.content,
        row.author,
        row.tags.split(','),
        row.provider
      );
      this.quoteRepository.add(quote);
    });

    this.quoteRepository.getAll().then(quotes => {
      assert.equal(quotes.length, tableDef.hashes().length);
    });
  }

  @given(/I have the quote of the day "(.*)"/)
  async givenIHaveTheQuoteOfTheDay(quoteId: string) {
    this.quote = await this.quoteRepository.getById(quoteId);
    assert.equal(this.quote.id, quoteId);
    assert.isDefined(this.quote.content);
  }

  @when(/I create a message from the quote/)
  whenGetQuoteOfTheDay() {
    const createMessage = new CreateMessage(this.messageRepository);
    createMessage.handle(this.quote);
  }

  @then('It is shared to the world')
  async thenIsSharedToTheWorld() {
    const messages: Message[] = await this.messageRepository.getAll();
    assert.equal(messages.length, 1);
  }

  @then(/The message with id "(.*)" should have the following body "(.*)"/)
  async thenShouldHaveAMessageBody(messageId: string, body: string) {
    const message: Message = await this.messageRepository.getById(messageId);
    assert.equal(message.body, body);
  }
}
