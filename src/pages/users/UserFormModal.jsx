import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser } from '../../api/endpoints/users';
import { useEnums } from '../../hooks/useEnums';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().optional(),
  role: z.coerce.number().min(1)
});

export const UserFormModal = ({ isOpen, onClose, user }) => {
  const isEditing = !!user;
  const queryClient = useQueryClient();
  const { enums } = useEnums();
  const roles = enums?.roles || [];
  const defaultRole = roles.length > 0 ? roles[0].id : 1;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: defaultRole }
  });

  useEffect(() => {
    if (user && isOpen) {
      reset({ name: user.name, email: user.email, role: user.role?.id || user.role });
    } else if (isOpen) {
      reset({ name: '', email: '', password: '', role: defaultRole });
    }
  }, [user, isOpen, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEditing ? updateUser({ id: user.id, data }) : createUser(data),
    onSuccess: () => {
      toast.success(`User ${isEditing ? 'updated' : 'created'} successfully`);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onClose();
    },
    onError: () => toast.error('An error occurred')
  });

  const onSubmit = (data) => {
    if (!isEditing && !data.password) {
      toast.error('Password is required for new users');
      return;
    }
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit User' : 'Create User'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Full Name" placeholder="John Doe" {...register('name')} error={errors.name?.message} />
        <Input label="Email Address" placeholder="user@example.com" type="email" {...register('email')} error={errors.email?.message} />
        <Input 
          label={isEditing ? "New Password (Optional)" : "Password"} 
          type="password" 
          placeholder="••••••••"
          {...register('password')} 
          error={errors.password?.message} 
        />
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Role</label>
          <select 
            {...register('role')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-colors"
          >
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        <div className="pt-6 flex justify-end gap-3 border-t border-border/50">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={mutation.isPending}>
            {isEditing ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
