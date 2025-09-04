'use client';
import { useRouter } from 'next/navigation';
import { createShipment } from '../dhl-api';
import { useState } from 'react';
import { formatError } from '@/utility';

export const useCreateShipment = (
  shouldAddExportDeclaration: boolean,
  onError: (e: string) => void
) => {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState<{
    status: 'idle' | 'loading' | 'error';
  }>({ status: 'idle' });

  const bookShipment = async (quoteId: string) => {
    setLoadingState({ status: 'loading' });
    try {
      const res = await createShipment(quoteId, shouldAddExportDeclaration);
      if ('id' in res) {
        router.push(`/shipment/${res.id}`);
      } else {
        setLoadingState({ status: 'error' });
        onError(formatError(res));
      }
    } catch (err) {
      setLoadingState({ status: 'error' });
      onError(formatError(err));
    }
    setLoadingState({ status: 'idle' });
  };

  return { bookShipment, loadingState };
};
