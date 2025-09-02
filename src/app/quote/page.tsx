'use client';
import { Address, countryCode } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { AddressForm, QuoteCard, ServicePointBooking } from './components';
import { useCreateShipment, useQuotes } from './hooks';
import { ServicePointOption } from './types';
import { isAddressComplete } from './utility';

export default function Page() {
  const [origin, setOrigin] = useState<Address>({
    streetAddress: 'Hammarbybacken 27',
    postalCode: '12030',
    city: 'Stockholm',
    countryCode: countryCode.SE,
  });
  const [destination, setDestination] = useState<Address>({
    streetAddress: 'Dammenvegen 2',
    postalCode: '2414',
    city: 'Elverum',
    countryCode: countryCode.NO,
  });
  const [strictOriginValidation, setStrictOriginValidation] = useState(true);
  const [shouldAddExportDeclaration, setShouldAddExportDeclaration] =
    useState(false);
  const [selectedServicePointOrLocker, setSelectedServicePointOrLocker] =
    useState<ServicePointOption | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { state: quotesState, fetchQuotes } = useQuotes(
    origin,
    destination,
    strictOriginValidation,
    () => setErrorMessage(null)
  );
  const { bookShipment } = useCreateShipment(shouldAddExportDeclaration, e =>
    setErrorMessage(e)
  );

  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (quotesState.status === 'error' || errorMessage) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [quotesState.status, errorMessage]);

  const servicePointOptions: ServicePointOption[] =
    quotesState.status === 'success'
      ? quotesState.servicePointAndLockerQuotes.map(quote => ({
          quoteId: quote.id,
          ...quote.deliveryService,
        }))
      : [];

  const loading = quotesState.status === 'loading';

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-12 sm:p-20 bg-gray-50 text-gray-600 overflow-y-auto">
      <div className="flex flex-col gap-8 w-full max-w-3xl pb-8">
        <div className="flex gap-4">
          <AddressForm
            type="origin"
            strictOriginValidation={strictOriginValidation}
            setStrictOriginValidation={setStrictOriginValidation}
            data={origin}
            setData={setOrigin}
            onSubmit={fetchQuotes}
            submitDisabled={loading || !isAddressComplete(origin)}
            isLoading={loading}
          />
          <AddressForm
            type="destination"
            data={destination}
            setData={setDestination}
            onSubmit={fetchQuotes}
            submitDisabled={loading || !isAddressComplete(destination)}
            isLoading={loading}
          />
        </div>

        {quotesState.status === 'success' &&
          quotesState.expressQuotes.map(quote => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              shouldAddExportDeclaration={shouldAddExportDeclaration}
              onToggleExportDeclaration={setShouldAddExportDeclaration}
              onBook={() => bookShipment(quote.id)}
              loading={loading}
            />
          ))}

        <ServicePointBooking
          options={servicePointOptions}
          selected={selectedServicePointOrLocker}
          onSelect={setSelectedServicePointOrLocker}
          onBook={() =>
            selectedServicePointOrLocker &&
            bookShipment(selectedServicePointOrLocker.quoteId).catch(e =>
              setErrorMessage(JSON.stringify(e))
            )
          }
          loading={loading}
        />

        <div ref={errorRef}>
          {quotesState.status === 'error' && (
            <div className="text-red-600 font-medium bg-red-100 p-3 rounded-lg">
              {quotesState.message}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-600 font-medium bg-red-100 p-3 rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
