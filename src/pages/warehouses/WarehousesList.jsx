import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWarehouses, updateWarehouse } from '../../api/endpoints/warehouses';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { WarehouseFormModal } from './WarehouseFormModal';
import toast from 'react-hot-toast';

const WarehousesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['warehouses'],
    queryFn: getWarehouses,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (warehouse) => updateWarehouse({ id: warehouse.id, data: { ...warehouse, is_active: !warehouse.is_active } }),
    onSuccess: () => {
      toast.success('Warehouse status updated');
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
    },
    onError: () => toast.error('Failed to update status')
  });

  const handleEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingWarehouse(null);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (warehouse) => {
    if (confirm('Are you sure you want to toggle this warehouse status?')) {
      toggleStatusMutation.mutate(warehouse);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouses</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your storage locations.</p>
        </div>
        <Button onClick={handleCreate} className="shadow-md">Create Warehouse</Button>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground animate-pulse">Loading warehouses...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-semibold text-foreground">{warehouse.name}</TableCell>
                  <TableCell className="text-muted-foreground">{warehouse.location}</TableCell>
                  <TableCell>
                    <Badge variant={warehouse.is_active ? 'success' : 'destructive'}>
                      {warehouse.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(warehouse)}>Edit</Button>
                    <Button 
                      variant={warehouse.is_active ? 'ghost' : 'default'} 
                      size="sm" 
                      onClick={() => handleToggleStatus(warehouse)}
                      isLoading={toggleStatusMutation.isPending && toggleStatusMutation.variables?.id === warehouse.id}
                      className={warehouse.is_active ? 'text-destructive hover:bg-destructive/10' : ''}
                    >
                      {warehouse.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    {/* View Stock button stub */}
                    <Button variant="outline" size="sm">View Stock</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <WarehouseFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        warehouse={editingWarehouse} 
      />
    </div>
  );
};

export default WarehousesList;
