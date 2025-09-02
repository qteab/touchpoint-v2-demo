import { ServicePointOption } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { ServicePointSelect } from './ServicePointSelect';

export const ServicePointBooking = ({
  options,
  selected,
  onSelect,
  onBook,
  loading,
}: {
  options: ServicePointOption[];
  selected: ServicePointOption | null;
  onSelect: (val: ServicePointOption | null) => void;
  onBook: () => void;
  loading: boolean;
}) => {
  if (!options.length) return null;

  return (
    <Card>
      <span className="font-semibold text-gray-700">
        Type: SERVICE_POINT | LOCKER
      </span>
      <ServicePointSelect
        value={selected}
        onChange={onSelect}
        options={options}
      />
      <Button onClick={onBook} disabled={loading || !selected}>
        {loading ? 'Loading…' : 'Book shipment'}
      </Button>
    </Card>
  );
};
