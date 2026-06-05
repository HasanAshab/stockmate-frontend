import { ArchiveBoxIcon, TagIcon, TruckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../../api/endpoints/dashboard';

const MetricCard = ({ title, value, icon: Icon, colorClass, linkTo }) => {
  const CardWrapper = linkTo ? Link : 'div';
  return (
    <CardWrapper 
      to={linkTo}
      className={`bg-card border border-border/60 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group ${linkTo ? 'cursor-pointer hover:-translate-y-1' : ''} relative overflow-hidden`}
    >
      <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-[0.08] transition-transform duration-700 group-hover:scale-150 ${colorClass.bg}`}></div>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
          <h3 className="text-4xl font-bold text-foreground tracking-tight">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl ${colorClass.bg} ${colorClass.text} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </CardWrapper>
  );
};

const Dashboard = () => {
  const { data: responseData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData
  });

  const data = responseData?.data || {
    total_products: 0,
    total_categories: 0,
    total_suppliers: 0,
    total_low_stock: 0,
    recent_stock_logs: []
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-muted rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 bg-muted/60 border border-border/50 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-80 bg-muted/60 border border-border/50 rounded-2xl mt-8"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome back. Here's what's happening with your inventory today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Products" 
          value={data.total_products} 
          icon={ArchiveBoxIcon} 
          colorClass={{ bg: 'bg-primary', text: 'text-primary' }}
        />
        <MetricCard 
          title="Categories" 
          value={data.total_categories} 
          icon={TagIcon} 
          colorClass={{ bg: 'bg-blue-500', text: 'text-blue-500' }}
        />
        <MetricCard 
          title="Total Suppliers" 
          value={data.total_suppliers} 
          icon={TruckIcon} 
          colorClass={{ bg: 'bg-purple-500', text: 'text-purple-500' }}
        />
        <MetricCard 
          title="Low Stock Alerts" 
          value={data.total_low_stock} 
          icon={ExclamationTriangleIcon} 
          colorClass={{ bg: 'bg-warning', text: 'text-warning' }}
          linkTo="/reports/low-stock"
        />
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-6 py-5 border-b border-border/60 flex justify-between items-center bg-muted/20">
          <h2 className="text-lg font-bold text-foreground tracking-tight">Recent Stock Activity</h2>
          <Link to="/stock" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">View all activity &rarr;</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/10 border-b border-border/50">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Recorded By</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.recent_stock_logs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-foreground group-hover:text-primary transition-colors">{log.product?.name || 'Unknown Product'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      log.type === 'in' 
                        ? 'bg-success/10 text-success border border-success/20' 
                        : 'bg-destructive/10 text-destructive border border-destructive/20'
                    }`}>
                      Stock {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[15px]">{log.type === 'in' ? '+' : '-'}{log.quantity}</td>
                  <td className="px-6 py-4 text-muted-foreground font-medium flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                      {(log.user?.name || 'U').charAt(0)}
                    </div>
                    {log.user?.name || 'Unknown User'}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{format(new Date(log.created_at), 'MMM d, yyyy HH:mm')}</td>
                </tr>
              ))}
              {data.recent_stock_logs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <ArchiveBoxIcon className="w-12 h-12 text-muted-foreground/30 mb-3" />
                      <p className="font-medium">No recent activity found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
