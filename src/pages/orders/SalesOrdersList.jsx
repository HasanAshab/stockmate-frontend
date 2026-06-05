import { useQuery } from '@tanstack/react-query';
import { getSalesOrders } from '../../api/endpoints/orders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { format } from 'date-fns';

const SalesOrdersList = () => {
  const { data, isLoading } = useQuery({ queryKey: ['salesOrders'], queryFn: getSalesOrders });

  const getStatusBadge = (status) => {
    switch(status) {
      case 1: return <Badge variant="warning">Pending</Badge>;
      case 2: return <Badge variant="success">Paid</Badge>;
      case 3: return <Badge variant="destructive">Failed</Badge>;
      case 4: return <Badge variant="default">Cancelled</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Orders</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage outbound customer orders.</p>
        </div>
        <Button className="shadow-md">Create Order</Button>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground animate-pulse">Loading orders...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((so) => (
                <TableRow key={so.id}>
                  <TableCell className="font-semibold font-mono text-foreground">SO-{String(so.id).padStart(5, '0')}</TableCell>
                  <TableCell className="font-medium">{so.customer_name}</TableCell>
                  <TableCell className="text-muted-foreground">{so.warehouse_name}</TableCell>
                  <TableCell>{getStatusBadge(so.status)}</TableCell>
                  <TableCell className="font-semibold text-foreground">৳ {so.total_amount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground font-medium text-[13px]">
                    {format(new Date(so.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    {so.status === 1 && <Button variant="default" size="sm">Pay Now</Button>}
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

export default SalesOrdersList;
