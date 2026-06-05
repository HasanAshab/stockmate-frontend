import { NavLink } from 'react-router-dom';
import api from '../../api/axios';
import { 
  HomeIcon, 
  UsersIcon, 
  BuildingOfficeIcon, 
  TagIcon, 
  TruckIcon, 
  ArchiveBoxIcon, 
  ShoppingCartIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const userStr = localStorage.getItem('authUser');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 2;

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout');
    } catch (e) {
      console.error('Logout failed', e);
    }
    localStorage.removeItem('authUser');
    window.location.href = '/login';
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-primary text-primary-foreground font-medium shadow-md translate-x-1' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1'
    }`;

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
      <div className="h-16 flex items-center px-6 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm shadow-primary/40">
            S
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight">StockMate</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-3">Main</div>
        <NavLink to="/dashboard" className={navItemClass}>
          <HomeIcon className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        
        {isAdmin && (
          <>
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-8 mb-3 px-3">Administration</div>
            <NavLink to="/users" className={navItemClass}>
              <UsersIcon className="w-5 h-5" />
              <span>Users</span>
            </NavLink>
            <NavLink to="/warehouses" className={navItemClass}>
              <BuildingOfficeIcon className="w-5 h-5" />
              <span>Warehouses</span>
            </NavLink>
            <NavLink to="/categories" className={navItemClass}>
              <TagIcon className="w-5 h-5" />
              <span>Categories</span>
            </NavLink>
            <NavLink to="/suppliers" className={navItemClass}>
              <TruckIcon className="w-5 h-5" />
              <span>Suppliers</span>
            </NavLink>
          </>
        )}

        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-8 mb-3 px-3">Inventory</div>
        <NavLink to="/products" className={navItemClass}>
          <ArchiveBoxIcon className="w-5 h-5" />
          <span>Products</span>
        </NavLink>
        <NavLink to="/stock" className={navItemClass}>
          <ArchiveBoxIcon className="w-5 h-5" />
          <span>Stock Management</span>
        </NavLink>
        
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-8 mb-3 px-3">Orders</div>
        <NavLink to="/purchase-orders" className={navItemClass}>
          <ShoppingCartIcon className="w-5 h-5" />
          <span>Purchase Orders</span>
        </NavLink>
        <NavLink to="/sales-orders" className={navItemClass}>
          <CurrencyDollarIcon className="w-5 h-5" />
          <span>Sales Orders</span>
        </NavLink>

        {isAdmin && (
          <>
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-8 mb-3 px-3">Reports</div>
            <NavLink to="/reports" className={navItemClass}>
              <DocumentChartBarIcon className="w-5 h-5" />
              <span>Reports</span>
            </NavLink>
          </>
        )}
      </div>

      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <NavLink to="/profile" className={navItemClass}>
          <UserCircleIcon className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
        <button onClick={handleLogout} className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200 hover:translate-x-1 font-medium">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
