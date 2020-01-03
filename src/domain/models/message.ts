export class Message {
  private _date: Date;

  constructor(
    private _id: string,
    private _content: string,
    private _author: string,
    private _tags: string[],
    private _provider: string
  ) {
    this._date = new Date();
  }

  get body(): string {
    return `${this._content} - ${this._author} ${this.formattedTags} (Provided by ${this._provider})`;
  }

  get formattedTags(): string {
    return '#quoteOfTheDay ' + this._tags.map(tag => `#${tag}`).join(' ');
  }

  get id(): string {
    return this._id;
  }

  get date(): Date {
    return this._date;
  }
}
