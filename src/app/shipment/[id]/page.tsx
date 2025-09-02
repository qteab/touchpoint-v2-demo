import { getShipmentById } from '../api';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const shipment = await getShipmentById(id);

  return (
    <div className="font-sans  min-h-screen p-8 pb-20 gap-12 sm:p-20 bg-gray-50 text-gray-600">
      <h2 className="text-xl font-semibold">Shipment successfully booked!</h2>
      <pre>{JSON.stringify(shipment, null, 2)}</pre>
    </div>
  );
}
