import { GetQuoteOfTheDay } from '@usecases';
import { assert } from 'chai';
import { InMemoryQuoteRepository } from '@adapters';
import { RepositoriesFactory } from '@factories';

describe('Get quote of the day', () => {
  const quoteRepository = RepositoriesFactory.createQuoteRepository();
  const getQuoteOfTheDay = new GetQuoteOfTheDay(quoteRepository);

  it('should get the quote of the day', async () => {
    assert.isDefined(await getQuoteOfTheDay.handle(8));
    assert.isDefined(await getQuoteOfTheDay.handle(9));
    assert.isDefined(await getQuoteOfTheDay.handle(10));
  });

  it('should not get the quote of the day', async () => {
    assert.isUndefined(await getQuoteOfTheDay.handle(21));
  });
});
