import { ExpressQuote } from '../types';
import { Button } from './Button';
import { Card } from './Card';

export const QuoteCard = ({
  quote,
  shouldAddExportDeclaration,
  onToggleExportDeclaration,
  onBook,
  loading,
}: {
  quote: ExpressQuote;
  shouldAddExportDeclaration: boolean;
  onToggleExportDeclaration: (val: boolean) => void;
  onBook: () => void;
  loading: boolean;
}) => {
  return (
    <Card>
      <span className="font-semibold text-gray-700">
        Type: {quote.deliveryService.type}
      </span>
      <span>ID: {quote.id}</span>
      <span>Dutiable: {quote.deliveryService.isDutiable ? 'Yes' : 'No'}</span>
      {quote.messages.length > 0 && (
        <span>
          Messages: <pre>{JSON.stringify(quote.messages, null, 2)}</pre>
        </span>
      )}
      {quote.deliveryService.isDutiable && (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={shouldAddExportDeclaration}
            onChange={e => onToggleExportDeclaration(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Add export declaration</span>
        </label>
      )}
      <Button onClick={onBook} disabled={loading}>
        {loading ? 'Loading…' : 'Book shipment'}
      </Button>
    </Card>
  );
};
