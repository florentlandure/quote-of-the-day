import { IQuoteRepository } from '@domain/repositories';
import { Quote } from '@domain/models';
import axios, { AxiosResponse } from 'axios';
import { IHttpQuoteResponse } from './http-quote-response.interface';

export class HttpQuoteRepository implements IQuoteRepository {
  getTodayQuote(): Promise<Quote> {
    const url: string = 'http://quotes.rest/qod.json';
    return axios
      .get<IHttpQuoteResponse>(url)
      .then(this.getAxiosData)
      .then(this.mapResponseToQuote);
  }

  private getAxiosData(response: AxiosResponse): IHttpQuoteResponse {
    return response.data;
  }

  private mapResponseToQuote(response: IHttpQuoteResponse): Quote {
    const quotesData = response?.contents?.quotes;
    const quoteData = quotesData[0];
    return quoteData
      ? new Quote(
          quoteData.id,
          quoteData.quote,
          quoteData.author,
          quoteData.tags,
          'theysaidso.com'
        )
      : undefined;
  }
}
