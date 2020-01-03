import { IMessageRepository, IQuoteRepository } from '@domain/repositories';
import { RepositoriesFactory } from '@factories';
import { ShareQuote, GetQuoteOfTheDay } from '@usecases';
import { Quote, Message } from '@domain/models';

const quoteRepository: IQuoteRepository = RepositoriesFactory.createQuoteRepository();
const messageRepository: IMessageRepository = RepositoriesFactory.createMessageRepository();

class Main {
  private quote: Quote;
  private getQuoteOfTheDay: GetQuoteOfTheDay;
  private shareQuote: ShareQuote;
  private intervalDurationMs: number = 1000 * 60 * 60;
  private startHour: number = 8;
  private endHour: number = 22;

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
    this.shareQuote = new ShareQuote(this.messageRepository);
  }

  private async run() {
    await this.getQuote();
    this.shareMessage();
  }

  private setLoop(): void {
    setInterval(() => {
      this.run();
    }, this.intervalDurationMs);
  }

  private async getQuote() {
    this.quote = await this.getQuoteOfTheDay.handle();
  }

  private async shareMessage(): Promise<void> {
    try {
      const hour: number = new Date().getHours();
      await this.shareQuote.handle(
        this.quote,
        hour,
        this.startHour,
        this.endHour
      );
      const message: Message = await this.messageRepository.getTodayMessage();

      console.log('--------');
      console.log(message.body);
    } catch (err) {
      console.error(err);
    }
  }
}

new Main(quoteRepository, messageRepository);
