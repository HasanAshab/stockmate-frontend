import { useQuery } from '@tanstack/react-query';
import { getPurchaseOrders } from '../../api/endpoints/orders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { useEnums } from '../../hooks/useEnums';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { format } from 'date-fns';

const PurchaseOrdersList = () => {
  const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = currentUser.role === 2;
  const { data, isLoading } = useQuery({ queryKey: ['purchaseOrders'], queryFn: getPurchaseOrders });
  const { enums } = useEnums();
  const statuses = enums?.purchase_order_statuses || [];

  const getStatusBadge = (statusId) => {
    const statusName = statuses.find(s => s.id === statusId)?.name || 'Unknown';
    switch(statusName) {
      case 'Draft': return <Badge variant="default">Draft</Badge>;
      case 'Ordered': return <Badge variant="primary">Ordered</Badge>;
      case 'PartiallyReceived': return <Badge variant="warning">Partially Received</Badge>;
      case 'Received': return <Badge variant="success">Received</Badge>;
      case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge>{statusName}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage inbound stock from suppliers.</p>
        </div>
        {isAdmin && <Button className="shadow-md">Create PO</Button>}
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground animate-pulse">Loading orders...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-semibold font-mono text-foreground">PO-{String(po.id).padStart(5, '0')}</TableCell>
                  <TableCell className="font-medium">{po.supplier_name}</TableCell>
                  <TableCell className="text-muted-foreground">{po.warehouse_name}</TableCell>
                  <TableCell>{getStatusBadge(po.status)}</TableCell>
                  <TableCell className="font-medium">{po.total_items}</TableCell>
                  <TableCell className="text-muted-foreground font-medium text-[13px]">
                    {format(new Date(po.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    {po.status === statuses.find(s => s.name === 'Ordered')?.id && <Button variant="default" size="sm">Receive</Button>}
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

export default PurchaseOrdersList;
