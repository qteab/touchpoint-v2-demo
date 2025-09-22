'use server';

export async function createShipment(
  quoteId: string,
  addExportDeclaration?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (!process.env.DHL_API_KEY || !process.env.BASE_URL) {
    throw new Error('Missing environment variables');
  }

  const exportData = addExportDeclaration
    ? {
        declaredValue: 100,
        declaredValueCurrency: 'SEK',
        exportDeclaration: {
          customerIdentification: {
            type: 'SOCIAL_SECURITY_NUMBER',
            identificationNumber: '1234567890',
          },
          exportReasonType: 'permanent',
          lineItems: [
            {
              number: 1,
              description: 'Item description',
              price: 100,
              priceCurrency: 'SEK',
              quantity: {
                value: 1,
                unitOfMeasurement: 'PCS',
              },
              manufacturerCountry: 'SE',
              weight: {
                netValue: 1,
                grossValue: 1,
              },
            },
          ],
          invoice: {
            date: '2025-09-01',
            number: '123456',
          },
        },
      }
    : undefined;

  const data = await fetch(
    `${process.env.BASE_URL}/v2/shipment?label=true&qrCodeFormat=png&qrCodeSize=300&skipPriceCalculation=true`,
    {
      method: 'POST',
      headers: {
        'Dhl-Api-Key': process.env.DHL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quote: {
          id: quoteId,
          ...exportData,
        },
      }),
    }
  );
  const shipment = await data.json();
  return shipment;
}
