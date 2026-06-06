import { useQuery } from '@tanstack/react-query';
import { getStockLogs } from '../../api/endpoints/stock';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { useEnums } from '../../hooks/useEnums';
import { format } from 'date-fns';

const StockLogsList = () => {
  const { data, isLoading } = useQuery({ queryKey: ['stockLogs'], queryFn: getStockLogs });
  const { enums } = useEnums();
  const types = enums?.stock_log_types || [];

  const getTypeName = (typeId) => types.find(t => t.id === typeId)?.name || 'Unknown';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stock Activity Logs</h1>
        <p className="text-muted-foreground mt-1 text-sm">Complete history of all stock movements.</p>
      </div>
      
      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground animate-pulse">Loading logs...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Recorded By</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-semibold text-foreground">{log.product_name}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                      getTypeName(log.type) === 'In' 
                        ? 'bg-success/10 text-success border-success/20' 
                        : 'bg-destructive/10 text-destructive border-destructive/20'
                    }`}>
                      {getTypeName(log.type)}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold">{getTypeName(log.type) === 'In' ? '+' : '-'}{log.quantity}</TableCell>
                  <TableCell className="text-muted-foreground">{log.warehouse_name}</TableCell>
                  <TableCell className="text-muted-foreground">{log.user_name}</TableCell>
                  <TableCell className="text-muted-foreground font-medium text-[13px]">
                    {format(new Date(log.created_at), 'MMM d, yyyy HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};
export default StockLogsList;
