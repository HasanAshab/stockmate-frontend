import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../../api/endpoints/profile';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('authUser') || '{}');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: user.name || '',
      password: ''
    }
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      const updatedUser = response.data || response;
      localStorage.setItem('authUser', JSON.stringify({ ...user, name: updatedUser.name }));
      toast.success('Profile updated successfully');
      reset({ name: updatedUser.name, password: '' });
      // reload to reflect changes in navbar/sidebar
      setTimeout(() => window.location.reload(), 500);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  });

  const onSubmit = (data) => {
    // Only send password if it's not empty
    const payload = { name: data.name };
    if (data.password) {
      payload.password = data.password;
    }
    mutation.mutate(payload);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your personal account settings.</p>
      </div>
      
      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-8 py-6 border-b border-border/60 bg-muted/20 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border border-primary/20">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{user.role === 2 ? 'Administrator' : 'Staff Member'}</p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input label="Full Name" {...register('name')} error={errors.name?.message} required />
            <Input label="Email Address" defaultValue={user.email} disabled className="opacity-70 cursor-not-allowed" />
            
            <div className="border-t border-border/50 pt-6 mt-6">
              <h3 className="font-bold text-foreground mb-4">Change Password</h3>
              <Input label="New Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
              <p className="text-xs text-muted-foreground mt-1">Leave blank to keep your current password.</p>
            </div>
            
            <div className="pt-6 flex justify-end">
              <Button type="submit" className="shadow-md px-8 font-semibold" isLoading={mutation.isPending}>Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
