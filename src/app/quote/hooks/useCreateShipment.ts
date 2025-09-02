'use client';
import { useRouter } from 'next/navigation';
import { createShipment } from '../api';
import { formatError } from '../utility';

export const useCreateShipment = (
  shouldAddExportDeclaration: boolean,
  onError: (e: string) => void
) => {
  const router = useRouter();

  const bookShipment = async (quoteId: string) => {
    try {
      const res = await createShipment(quoteId, shouldAddExportDeclaration);
      if ('id' in res) {
        router.push(`/shipment/${res.id}`);
      } else {
        onError(formatError(res));
      }
    } catch (err) {
      onError(formatError(err));
    }
  };

  return { bookShipment };
};
