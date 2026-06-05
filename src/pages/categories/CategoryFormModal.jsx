import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory, updateCategory } from '../../api/endpoints/categories';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional()
});

export const CategoryFormModal = ({ isOpen, onClose, category }) => {
  const isEditing = !!category;
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (category && isOpen) {
      reset({ name: category.name, description: category.description || '' });
    } else if (isOpen) {
      reset({ name: '', description: '' });
    }
  }, [category, isOpen, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEditing ? updateCategory({ id: category.id, data }) : createCategory(data),
    onSuccess: () => {
      toast.success(`Category ${isEditing ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      onClose();
    },
    onError: () => toast.error('An error occurred')
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Category' : 'Create Category'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Category Name" placeholder="e.g. Electronics" {...register('name')} error={errors.name?.message} />
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Description</label>
          <textarea 
            {...register('description')}
            rows={3}
            placeholder="Optional description"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-colors resize-none"
          />
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isEditing ? 'Save Changes' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
