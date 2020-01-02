import { IQuoteRepository } from '@domain/repositories';
import { Quote } from '@domain/models';
import axios from 'axios';
import { IHttpQuoteResponse } from './http-quote-response.interface';

export class HttpQuoteRepository implements IQuoteRepository {
  getTodayQuote(): Promise<Quote> {
    return axios
      .get<IHttpQuoteResponse>('http://quotes.rest/qod.json')
      .then(axiosResponse => axiosResponse.data)
      .then((response: IHttpQuoteResponse) =>
        response.contents
          ? response.contents.quotes.map(
              quote =>
                new Quote(
                  quote.id,
                  quote.quote,
                  quote.author,
                  quote.tags,
                  'theysaidso.com'
                )
            )
          : []
      )
      .then(quotes => quotes[0]);
  }
}
