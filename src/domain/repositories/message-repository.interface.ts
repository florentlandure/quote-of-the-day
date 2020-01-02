import { Message } from '@domain/models';

export interface IMessageRepository {
  getAll: () => Promise<Message[]>;
  add: (message: Message) => Promise<void>;
  getById: (id: string) => Promise<Message>;
}
