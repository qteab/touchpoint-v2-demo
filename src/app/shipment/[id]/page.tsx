import { findNearestServicePoints, getShipmentById } from '../api';
import Image from 'next/image';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const shipment = await getShipmentById(id);

  const closestServicePoints = await findNearestServicePoints({
    address: {
      cityName: shipment.origin.city,
      postalCode: shipment.origin.postalCode,
      countryCode: shipment.origin.countryCode,
      street: shipment.origin.streetAddress,
    },
    ...(shipment.vendor.name === 'DHL_EXPRESS'
      ? { vendor: 'DHL_EXPRESS', serviceTypes: ['label_free'] }
      : { vendor: 'DHL_FREIGHT', serviceTypes: ['parcel_drop_off'] }),
  });

  const closest = closestServicePoints.servicePoints.reduce((prev, curr) => {
    return prev.distance < curr.distance ? prev : curr;
  });

  const label = shipment.label;
  const qrCode = shipment.qrCode;
  const commercialInvoice = shipment.documents.find(
    doc => doc.type === 'COMMERCIAL_INVOICE'
  );

  const pdfBase64ToDataUrl = (b64: string) =>
    `data:application/pdf;base64,${b64}`;

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-12 sm:p-20 bg-gray-50 text-gray-600">
      <h2 className="text-xl font-semibold">Shipment successfully booked!</h2>

      <div className="space-y-8 mt-6">
        <div className="flex gap-4">
          {qrCode && (
            <div>
              <h3 className="font-semibold">QR Code for drop-off</h3>
              <Image
                src={qrCode}
                alt="QR Code"
                className="border rounded p-2 bg-white"
                width={400}
                height={400}
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </div>
          )}
          {closest && (
            <div>
              <h3 className="font-semibold">
                Closest Service Point for drop-off
              </h3>
              <div className=" bg-white rounded shadow p-6">
                <p>
                  <strong>{closest.name}</strong>
                </p>
                <p>
                  {closest.street}, {closest.postalCode} {closest.cityName},{' '}
                  {closest.countryCode}
                </p>
                <p>
                  Distance: {closest.distance} {closest.distanceUnit}
                </p>
                <p>Vendor: {closest.vendor}</p>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          {label && (
            <div className="w-full">
              <h3 className="font-semibold">Shipping Label</h3>
              <object
                data={pdfBase64ToDataUrl(label)}
                type="application/pdf"
                className="rounded border w-full h-[1200px]"
              >
                <p>
                  PDF cannot be displayed.{' '}
                  <a
                    href={pdfBase64ToDataUrl(label)}
                    download="label.pdf"
                    className="text-blue-600 underline"
                  >
                    Download Label
                  </a>
                </p>
              </object>
            </div>
          )}

          {commercialInvoice?.content && (
            <div className="w-full">
              <h3 className="font-semibold">Commercial Invoice</h3>
              <object
                data={pdfBase64ToDataUrl(commercialInvoice.content)}
                type="application/pdf"
                className="rounded border w-full h-[1200px]"
              >
                <p>
                  PDF cannot be displayed.{' '}
                  <a
                    href={pdfBase64ToDataUrl(commercialInvoice.content)}
                    download="invoice.pdf"
                    className="text-blue-600 underline"
                  >
                    Download Invoice
                  </a>
                </p>
              </object>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-semibold">Shipment response data</h3>
        <pre className=" bg-white p-4 rounded shadow text-xs overflow-auto">
          {JSON.stringify(shipment, null, 2)}
        </pre>
      </div>
    </div>
  );
}
