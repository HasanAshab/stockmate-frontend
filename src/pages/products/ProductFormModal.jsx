import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct } from '../../api/endpoints/products';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().min(1, 'SKU is required'),
  category_id: z.coerce.number().min(1, 'Category is required'),
  supplier_id: z.coerce.number().min(1, 'Supplier is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
});

export const ProductFormModal = ({ isOpen, onClose, product }) => {
  const isEditing = !!product;
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (product && isOpen) {
      reset({ 
        name: product.name, 
        sku: product.sku, 
        price: product.price,
        category_id: 1, // hardcoded for mock since API didn't return IDs
        supplier_id: 1 
      });
    } else if (isOpen) {
      reset({ name: '', sku: '', price: 0, category_id: 1, supplier_id: 1 });
    }
  }, [product, isOpen, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEditing ? updateProduct({ id: product.id, data }) : createProduct(data),
    onSuccess: () => {
      toast.success(`Product ${isEditing ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    },
    onError: () => toast.error('An error occurred')
  });

  const onSubmit = (data) => {
    // Note: Image upload is omitted in this simplified version.
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Product' : 'Create Product'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Product Name" placeholder="e.g. MacBook Pro" {...register('name')} error={errors.name?.message} />
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="SKU" placeholder="MAC-PRO-16" {...register('sku')} error={errors.sku?.message} />
          <Input label="Price (BDT)" type="number" step="0.01" {...register('price')} error={errors.price?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Category</label>
            <select 
              {...register('category_id')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <option value={1}>Electronics</option>
              <option value={2}>Furniture</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Supplier</label>
            <select 
              {...register('supplier_id')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <option value={1}>Global Tech Supplies</option>
              <option value={2}>Mega Traders</option>
            </select>
          </div>
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border/50 mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isEditing ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
