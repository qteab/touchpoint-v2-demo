import { ExpressQuote, ServicePointOrLockerQuote } from './quote';

export type QuotesState =
  | { status: 'idle' }
  | { status: 'loading' }
  | {
      status: 'success';
      expressQuotes: ExpressQuote[];
      servicePointAndLockerQuotes: ServicePointOrLockerQuote[];
    }
  | { status: 'error'; message: string };
