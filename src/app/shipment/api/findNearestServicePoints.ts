'use server';

import { countryCode } from '@/types';
import { ServicePoint } from '../types';

type FreightInput = {
  vendor: 'DHL_FREIGHT';
  serviceTypes: Array<'parcel_drop_off'>;
};

type ExpressInput = {
  vendor: 'DHL_EXPRESS';
  serviceTypes: Array<'label_free'>;
};

export type FindNearestServicePointsInput = {
  address: {
    street: string;
    cityName: string;
    postalCode: string;
    countryCode: keyof typeof countryCode;
  };
} & (FreightInput | ExpressInput);

export async function findNearestServicePoints(
  inputData: FindNearestServicePointsInput
): Promise<{ servicePoints: ServicePoint[] }> {
  if (!process.env.DHL_API_KEY || !process.env.BASE_URL) {
    throw new Error('Missing environment variables');
  }
  const data = await fetch(
    `${process.env.BASE_URL}/v2/tradera/servicepoint/findnearest`,
    {
      method: 'POST',
      headers: {
        'Dhl-Api-Key': process.env.DHL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    }
  );
  const servicePoints = await data.json();
  return servicePoints as { servicePoints: ServicePoint[] };
}
