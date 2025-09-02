import { Address } from '@/types';

export const isAddressComplete = (address: Address) => {
  return Boolean(
    address.city &&
      address.countryCode &&
      address.postalCode &&
      address.streetAddress
  );
};
