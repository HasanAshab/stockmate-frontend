import { forwardRef } from "react";

const Input = forwardRef(({ className, type, error, label, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${error ? 'border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive' : 'hover:border-border/80'} ${className || ''}`}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-[13px] text-destructive font-medium animate-in slide-in-from-top-1 fade-in duration-200">{error}</p>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
