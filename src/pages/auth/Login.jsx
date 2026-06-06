import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const loginResponse = await api.post('/api/v1/auth/token/login', data);
      console.log("loginResponse", loginResponse.data);

      const { token, user: rawUser } = loginResponse.data;

      // Flatten user object from JSON API if necessary
      const user = rawUser.data ? { id: rawUser.data.id, ...rawUser.data.attributes } : rawUser;

      if (!user.is_active) {
        toast.error("Your account has been deactivated.");
        return;
      }

      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));

      toast.success("Welcome back!");
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-card/70 backdrop-blur-2xl border border-border/60 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 animate-in fade-in zoom-in-[0.98] duration-700">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
              <span className="text-2xl font-bold text-primary-foreground">S</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to StockMate</h1>
            <p className="text-muted-foreground mt-3 text-sm">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
              <div className="flex justify-end pt-1">
                <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-[15px] mt-4 font-semibold rounded-xl" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          {/* Demo Credentials Widget */}
          <div className="mt-8 p-4 bg-muted/40 rounded-xl border border-border/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
            <h3 className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Demo Credentials
            </h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => reset({ email: 'admin@example.com', password: 'password' })}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-card border border-transparent hover:border-border/50 transition-all text-left group/btn"
              >
                <div>
                  <div className="text-[13px] font-semibold text-foreground group-hover/btn:text-primary transition-colors">Admin</div>
                  <div className="text-[11px] text-muted-foreground font-mono">admin@example.com</div>
                </div>
                <div className="text-[11px] bg-muted px-2 py-1 rounded text-muted-foreground font-mono">password</div>
              </button>

              <button
                type="button"
                onClick={() => reset({ email: 'staff@example.com', password: 'password' })}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-card border border-transparent hover:border-border/50 transition-all text-left group/btn"
              >
                <div>
                  <div className="text-[13px] font-semibold text-foreground group-hover/btn:text-primary transition-colors">Staff</div>
                  <div className="text-[11px] text-muted-foreground font-mono">staff@example.com</div>
                </div>
                <div className="text-[11px] bg-muted px-2 py-1 rounded text-muted-foreground font-mono">password</div>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground font-medium">
            <p>Protected internal system. Authorized personnel only.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
