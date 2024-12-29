import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { LoadingSpinner } from "./loading-spinner";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
  }[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  emptyState?: {
    title: string;
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
}

export function DataTable<T>({ 
  data, 
  columns,
  isLoading,
  error,
  onRetry,
  emptyState
}: DataTableProps<T>) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (!data.length && emptyState) {
    return (
      <EmptyState
        title={emptyState.title}
        description={emptyState.description}
        action={emptyState.action}
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.accessorKey)}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={String(column.accessorKey)}>
                {column.cell ? column.cell(item) : String(item[column.accessorKey])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}