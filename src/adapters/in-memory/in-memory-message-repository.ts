import { IMessageRepository } from '@domain/repositories';
import { Message } from '@domain/models';

export class InMemoryMessageRepository implements IMessageRepository {
  private _messages: Message[] = [];

  async add(message: Message): Promise<void> {
    this._messages.push(message);
  }

  async getById(id: string): Promise<Message> {
    return this._messages.find(message => message.id === id);
  }

  async getTodayMessage(): Promise<Message> {
    return this._messages[0];
  }
}
