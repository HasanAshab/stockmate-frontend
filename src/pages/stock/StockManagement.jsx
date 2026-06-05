import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { submitStockIn, submitStockOut } from '../../api/endpoints/stock';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const StockManagement = () => {
  const [activeTab, setActiveTab] = useState('in');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stock Operations</h1>
        <p className="text-muted-foreground mt-1 text-sm">Record incoming and outgoing stock.</p>
      </div>

      <div className="flex p-1 bg-muted/60 rounded-xl w-fit shadow-inner">
        <button onClick={() => setActiveTab('in')} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'in' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Stock In</button>
        <button onClick={() => setActiveTab('out')} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'out' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Stock Out</button>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8">
        {activeTab === 'in' ? <StockInForm /> : <StockOutForm />}
      </div>
    </div>
  );
};

const StockInForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const mutation = useMutation({
    mutationFn: submitStockIn,
    onSuccess: () => { toast.success('Stock added successfully'); reset(); }
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success border border-success/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Receive Stock</h2>
          <p className="text-xs text-muted-foreground font-medium">Add new inventory to a warehouse</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Warehouse</label>
          <select {...register('warehouse_id')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors hover:border-border/80">
            <option value="1">Main Hub</option>
            <option value="2">North Branch</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Product</label>
          <select {...register('product_id')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors hover:border-border/80">
            <option value="1">MacBook Pro 16"</option>
            <option value="2">Dell XPS 15</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Input label="Quantity" type="number" min="1" {...register('quantity')} required />
        <Input label="Unit Cost (Optional)" type="number" step="0.01" min="0" {...register('unit_cost')} />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Note (Optional)</label>
        <textarea {...register('note')} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors hover:border-border/80 resize-none" placeholder="Add any relevant details here..." />
      </div>
      <div className="pt-6 flex justify-end border-t border-border/50">
        <Button type="submit" isLoading={mutation.isPending} className="bg-success text-success-foreground hover:bg-success/90 shadow-sm shadow-success/20 font-semibold px-8">Confirm Stock In</Button>
      </div>
    </form>
  );
};

const StockOutForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const mutation = useMutation({
    mutationFn: submitStockOut,
    onSuccess: () => { toast.success('Stock deducted successfully'); reset(); },
    onError: () => { toast.error('Insufficient stock'); }
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive border border-destructive/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Dispatch Stock</h2>
          <p className="text-xs text-muted-foreground font-medium">Remove inventory from a warehouse</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Warehouse</label>
          <select {...register('warehouse_id')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors hover:border-border/80">
            <option value="1">Main Hub</option>
            <option value="2">North Branch</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Product</label>
          <select {...register('product_id')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors hover:border-border/80">
            <option value="1">MacBook Pro 16"</option>
            <option value="2">Dell XPS 15</option>
          </select>
        </div>
      </div>
      <Input label="Quantity to Deduct" type="number" min="1" {...register('quantity')} required />
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Note / Reason</label>
        <textarea {...register('note')} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50 transition-colors hover:border-border/80 resize-none focus-visible:border-destructive" placeholder="Required for dispatch tracking..." required />
      </div>
      <div className="pt-6 flex justify-end border-t border-border/50">
        <Button type="submit" variant="destructive" isLoading={mutation.isPending} className="font-semibold px-8 shadow-sm shadow-destructive/20">Confirm Stock Out</Button>
      </div>
    </form>
  );
};

export default StockManagement;
