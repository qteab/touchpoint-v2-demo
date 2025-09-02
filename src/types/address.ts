import { countryCode } from './countryCode';

export type Address = {
  streetAddress: string;
  postalCode: string;
  city: string;
  countryCode: keyof typeof countryCode;
};
