'use server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getShipmentById(id: string): Promise<any> {
  if (!process.env.DHL_API_KEY || !process.env.BASE_URL) {
    throw new Error('Missing environment variables');
  }
  const data = await fetch(
    `${process.env.BASE_URL}/v2/tradera/shipment/${id}`,
    {
      method: 'GET',
      headers: {
        'Dhl-Api-Key': process.env.DHL_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
  const quotes = await data.json();
  return quotes;
}
