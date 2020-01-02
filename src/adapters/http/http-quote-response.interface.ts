export interface IHttpQuoteResponse {
  success: {
    total: number;
  };
  contents: {
    quotes: Array<{
      author?: string;
      quote?: string;
      tags?: string[];
      id?: string;
      image?: string;
      length?: number;
    }>;
  };
}
