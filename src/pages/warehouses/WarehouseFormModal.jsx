import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWarehouse, updateWarehouse } from '../../api/endpoints/warehouses';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  is_active: z.boolean()
});

export const WarehouseFormModal = ({ isOpen, onClose, warehouse }) => {
  const isEditing = !!warehouse;
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { is_active: true }
  });

  useEffect(() => {
    if (warehouse && isOpen) {
      reset({ name: warehouse.name, location: warehouse.location, is_active: warehouse.is_active });
    } else if (isOpen) {
      reset({ name: '', location: '', is_active: true });
    }
  }, [warehouse, isOpen, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEditing ? updateWarehouse({ id: warehouse.id, data }) : createWarehouse(data),
    onSuccess: () => {
      toast.success(`Warehouse ${isEditing ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      onClose();
    },
    onError: () => toast.error('An error occurred')
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Warehouse' : 'Create Warehouse'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Warehouse Name" placeholder="e.g. Main Hub" {...register('name')} error={errors.name?.message} />
        <Input label="Location" placeholder="e.g. Dhaka, Bangladesh" {...register('location')} error={errors.location?.message} />
        
        <div className="flex items-center gap-2 pt-2">
          <input 
            type="checkbox" 
            id="is_active" 
            {...register('is_active')}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-foreground cursor-pointer">
            Warehouse is active
          </label>
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isEditing ? 'Save Changes' : 'Create Warehouse'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
