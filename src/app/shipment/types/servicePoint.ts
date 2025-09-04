export type ServicePoint = {
  id: string;
  servicePointId: string;
  street: string;
  name: string;
  cityName: string;
  postalCode: string;
  countryCode: string;
  distance: string;
  routeDistance: string;
  distanceUnit: 'm' | 'km' | 'mi';
  latitude: string;
  longitude: string;
  vendor: 'DHL_EXPRESS' | 'DHL_FREIGHT';
};
