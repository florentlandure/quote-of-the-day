import { Quote } from '@domain/models';

export interface IAppState {
  lastAction?: string;
  quote?: Quote;
}
