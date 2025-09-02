'use client';

import { ServicePointOption } from '../types/servicePoint';

interface Props {
  options: ServicePointOption[];
  value: ServicePointOption | null;
  onChange: (value: ServicePointOption | null) => void;
}

export function ServicePointSelect({ options, value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const found = options.find(opt => opt.quoteId === selectedId) || null;
    onChange(found);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <select
        className="border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-blue-500"
        value={value?.quoteId ?? ''}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a service point
        </option>
        {options.map(opt => (
          <option key={opt.quoteId} value={opt.quoteId}>
            {opt.servicePoint.name} - {opt.servicePoint.distance.route}{' '}
            {opt.servicePoint.distance.unit.toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
