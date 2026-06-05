import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupplier, updateSupplier } from '../../api/endpoints/suppliers';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional()
});

export const SupplierFormModal = ({ isOpen, onClose, supplier }) => {
  const isEditing = !!supplier;
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (supplier && isOpen) {
      reset({ name: supplier.name, phone: supplier.phone, email: supplier.email || '', address: supplier.address || '' });
    } else if (isOpen) {
      reset({ name: '', phone: '', email: '', address: '' });
    }
  }, [supplier, isOpen, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEditing ? updateSupplier({ id: supplier.id, data }) : createSupplier(data),
    onSuccess: () => {
      toast.success(`Supplier ${isEditing ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      onClose();
    },
    onError: () => toast.error('An error occurred')
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Supplier' : 'Create Supplier'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Supplier Name" placeholder="e.g. Global Tech Supplies" {...register('name')} error={errors.name?.message} />
        <Input label="Phone Number" placeholder="+8801..." {...register('phone')} error={errors.phone?.message} />
        <Input label="Email Address" type="email" placeholder="Optional" {...register('email')} error={errors.email?.message} />
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Address</label>
          <textarea 
            {...register('address')}
            rows={3}
            placeholder="Optional address"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-colors resize-none"
          />
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isEditing ? 'Save Changes' : 'Create Supplier'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
