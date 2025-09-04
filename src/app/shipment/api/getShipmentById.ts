'use server';

import { Shipment } from '../types';

export async function getShipmentById(id: string): Promise<Shipment> {
  if (!process.env.DHL_API_KEY || !process.env.BASE_URL) {
    throw new Error('Missing environment variables');
  }
  const data = await fetch(
    `${process.env.BASE_URL}/v2/tradera/shipment/${id}?label=true&qrCodeFormat=png`,
    {
      method: 'GET',
      headers: {
        'Dhl-Api-Key': process.env.DHL_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
  const shipment = await data.json();
  return shipment as Shipment;
}
