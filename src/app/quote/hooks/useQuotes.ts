'use client';
import { Address } from '@/types';
import { useState } from 'react';
import { getQuotes } from '../dhl-api';
import {
  isExpressQuote,
  isServicePointOrLockerQuote,
  QuotesState,
} from '../types';
import { formatError } from '@/utility';

export const useQuotes = (
  origin: Address,
  destination: Address,
  strictOriginValidation: boolean,
  onComplete?: () => void
) => {
  const [state, setState] = useState<QuotesState>({ status: 'idle' });

  const fetchQuotes = async () => {
    setState({ status: 'loading' });
    try {
      const res = await getQuotes({
        origin,
        destination,
        strictOriginValidation,
      });
      if ('quotes' in res) {
        setState({
          status: 'success',
          expressQuotes: res.quotes.filter(isExpressQuote),
          servicePointAndLockerQuotes: res.quotes.filter(
            isServicePointOrLockerQuote
          ),
        });
      } else {
        setState({ status: 'error', message: formatError(res) });
      }
    } catch (err) {
      setState({ status: 'error', message: formatError(err) });
    } finally {
      onComplete?.();
    }
  };

  return { state, fetchQuotes };
};
