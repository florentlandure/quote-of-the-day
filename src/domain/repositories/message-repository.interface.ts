import { Message } from '@domain/models';

export interface IMessageRepository {
  add: (message: Message) => Promise<void>;
  getById: (id: string) => Promise<Message>;
  getTodayMessage: () => Promise<Message>;
}
