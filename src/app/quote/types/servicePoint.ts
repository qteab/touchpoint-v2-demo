import { ServicePointOrLockerDeliveryService } from './quote';

export type ServicePointOption = {
  quoteId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
} & ServicePointOrLockerDeliveryService;
