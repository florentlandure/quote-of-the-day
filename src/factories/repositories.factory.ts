import {
  InMemoryQuoteRepository,
  InMemoryMessageRepository,
  HttpQuoteRepository
} from '@adapters';
import { IQuoteRepository, IMessageRepository } from '@domain/repositories';

export namespace RepositoriesFactory {
  const env: string = process.env.ENV || 'test';

  export const createQuoteRepository = (): IQuoteRepository =>
    env === 'prod' ? new HttpQuoteRepository() : new InMemoryQuoteRepository();

  export const createMessageRepository = (): IMessageRepository =>
    new InMemoryMessageRepository();
}
