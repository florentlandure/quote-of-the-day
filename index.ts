import { IMessageRepository, IQuoteRepository } from '@domain/repositories';
import { RepositoriesFactory } from '@factories';
import { CreateMessage, GetQuoteOfTheDay } from '@usecases';
import { Quote, Message } from '@domain/models';

const quoteRepository: IQuoteRepository = RepositoriesFactory.createQuoteRepository();
const messageRepository: IMessageRepository = RepositoriesFactory.createMessageRepository();

class Main {
  private quote: Quote;
  private getQuoteOfTheDay: GetQuoteOfTheDay;
  private createMessage: CreateMessage;
  private intervalDurationMs: number = 1000 * 60 * 60;

  constructor(
    private quoteRepository: IQuoteRepository,
    private messageRepository: IMessageRepository
  ) {
    this.init();
    this.run();
    this.setLoop();
  }

  private init(): void {
    this.getQuoteOfTheDay = new GetQuoteOfTheDay(this.quoteRepository);
    this.createMessage = new CreateMessage(this.messageRepository);
  }

  private setLoop(): void {
    setInterval(() => {
      this.run();
    }, this.intervalDurationMs);
  }

  private async run() {
    const hours = new Date().getHours();
    await this.getQuote(hours);
    this.shareMessage();
  }

  private async getQuote(hours: number) {
    this.quote = await this.getQuoteOfTheDay.handle(hours);
  }

  private async shareMessage(): Promise<void> {
    if (this.quote) {
      await this.createMessage.handle(this.quote);
    }

    const messages: Message[] = await this.messageRepository.getAll();
    messages.forEach(message => {
      console.log('--------');
      console.log(message.body);
    });
  }
}

new Main(quoteRepository, messageRepository);
