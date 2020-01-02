export class Quote {
  constructor(
    private _id: string,
    private _content: string,
    private _author: string,
    private _tags: string[],
    private _provider: string
  ) {}

  get id(): string {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get author(): string {
    return this._author;
  }

  get tags(): string[] {
    return this._tags;
  }

  get provider(): string {
    return this._provider;
  }
}
