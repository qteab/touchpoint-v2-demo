'use client';

import { countryCode, countryName } from '@/types';
import { FC } from 'react';
import { Button } from './Button';

type Props<T extends 'origin' | 'destination'> = {
  type: T;
  data: {
    streetAddress: string;
    postalCode: string;
    city: string;
    countryCode: keyof typeof countryCode;
  };
  strictOriginValidation?: T extends 'origin' ? boolean : never;
  setStrictOriginValidation?: T extends 'origin'
    ? React.Dispatch<React.SetStateAction<boolean>>
    : never;
  setData: React.Dispatch<React.SetStateAction<Props<T>['data']>>;
  onSubmit?: (data: Props<T>['data']) => void;
  submitDisabled?: boolean;
  isLoading?: boolean;
};

export const AddressForm = <T extends 'origin' | 'destination'>({
  type,
  data,
  setData,
  onSubmit,
  submitDisabled,
  isLoading,
  strictOriginValidation,
  setStrictOriginValidation,
}: Props<T>) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', data);
    onSubmit?.(data);
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {type === 'origin' ? 'Origin' : 'Destination'}
        </h2>

        <div>
          <label className="block text-sm font-medium">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={data.streetAddress}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={data.postalCode}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <select
            name="countryCode"
            value={data.countryCode}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
            required
          >
            <option value="">Select a country</option>
            {Object.values(countryCode).map(code => (
              <option key={code} value={code}>
                {countryName[code]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center justify-between">
          <Button type="submit" disabled={submitDisabled}>
            {isLoading ? 'Loading…' : 'Get Quotes'}
          </Button>
          {strictOriginValidation !== undefined &&
            setStrictOriginValidation !== undefined && (
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={strictOriginValidation}
                    onChange={e => setStrictOriginValidation(e.target.checked)}
                  />
                  <span>Strict validation?</span>
                </label>
              </div>
            )}
        </div>
      </form>
    </div>
  );
};
