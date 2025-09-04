import { Address } from '@/types';

//This type is not exhaustive, please refer to the swagger documentation for more details
export type Shipment = {
  id: string;
  vendor: {
    name: 'DHL_EXPRESS' | 'DHL_FREIGHT';
    productCode: string;
    transportInstructionId: string;
  };
  origin: Address;
  label?: string;
  qrCode?: string;
  documents: {
    type: 'COMMERCIAL_INVOICE';
    imageFormat: 'PDF';
    content: string;
  }[];
};
