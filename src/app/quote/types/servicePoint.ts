import { ServicePointOrLockerDeliveryService } from './quote';

export type ServicePointOption = {
  quoteId: string;
} & ServicePointOrLockerDeliveryService;
