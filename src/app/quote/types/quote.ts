export type ExpressDeliveryService = {
  type: 'EXPRESS';
  isDutiable: boolean;
};

export type ServicePointOrLockerDeliveryService = {
  type: 'SERVICE_POINT' | 'LOCKER';
  servicePoint: {
    id: string;
    name: string;
    distance: {
      route: number;
      unit: 'KM' | 'M';
    };
    address: {
      streetAddress: string;
      city: string;
      postalCode: string;
      countryCode: string;
    };
  };
};

export type Quote =
  | {
      id: string;
      deliveryService: ExpressDeliveryService;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: any[];
    }
  | {
      id: string;
      deliveryService: ServicePointOrLockerDeliveryService;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: any[];
    };

export type ExpressQuote = Extract<
  Quote,
  { deliveryService: { type: 'EXPRESS' } }
>;
export type ServicePointOrLockerQuote = Extract<
  Quote,
  { deliveryService: { type: 'SERVICE_POINT' | 'LOCKER' } }
>;

export function isExpressQuote(q: Quote): q is ExpressQuote {
  return q.deliveryService.type === 'EXPRESS';
}
export function isServicePointOrLockerQuote(
  q: Quote
): q is ServicePointOrLockerQuote {
  return (
    q.deliveryService.type === 'SERVICE_POINT' ||
    q.deliveryService.type === 'LOCKER'
  );
}
