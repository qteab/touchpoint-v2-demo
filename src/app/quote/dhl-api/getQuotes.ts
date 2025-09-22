'use server';

import { Address } from '@/types';
import { Quote } from '../types/quote';

export async function getQuotes({
  origin,
  destination,
  strictOriginValidation,
}: {
  origin: Address;
  destination: Address;
  strictOriginValidation?: boolean;
}): Promise<{ quotes: Quote[] }> {
  if (!process.env.DHL_API_KEY || !process.env.BASE_URL) {
    throw new Error('Missing environment variables');
  }
  const data = await fetch(
    `${process.env.BASE_URL}/v2/quote?strictOriginValidation=${
      strictOriginValidation !== undefined ? strictOriginValidation : true
    }&skipPriceCalculation=true`,
    {
      method: 'POST',
      headers: {
        'Dhl-Api-Key': process.env.DHL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shipper: {
          email: 'test@qte.se',
          references: 'Test',
          name: 'Qte Development AB',
          phoneNumber: '+46761234567',
        },
        origin: origin,
        recipient: {
          phoneNumber: '+46761234567',
          name: 'Test',
          email: 'test@qte.se',
        },
        destination: destination,
        additionalServices: {
          insurance: {
            value: 10000,
            currency: 'SEK',
          },
        },
        deliveryService: {
          options: [
            {
              type: 'ANY_SERVICE_POINT',
            },
            {
              type: 'LOCKER',
            },
            {
              type: 'EXPRESS',
              content: {
                description: 'Description of contents',
                incoterm: 'DAP',
                declaredValue: 7000,
                declaredValueCurrency: 'SEK',
              },
            },
          ],
          priority: 'IN_ORDER',
        },
        packages: [
          {
            dimensions: { unit: 'M', length: 0.2, width: 0.2, height: 0.1 },
            weight: { unit: 'G', value: 200 },
          },
        ],
      }),
    }
  );
  const quotes = await data.json();
  return quotes;
}
