import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';
import Login from '../pages/auth/Login';
import Profile from '../pages/auth/Profile';
import Dashboard from '../pages/dashboard/Dashboard';
import UserList from '../pages/users/UserList';
import WarehousesList from '../pages/warehouses/WarehousesList';
import CategoriesList from '../pages/categories/CategoriesList';
import SuppliersList from '../pages/suppliers/SuppliersList';
import ProductsList from '../pages/products/ProductsList';
import StockManagement from '../pages/stock/StockManagement';
import StockLogsList from '../pages/stock/StockLogsList';
import PurchaseOrdersList from '../pages/orders/PurchaseOrdersList';
import SalesOrdersList from '../pages/orders/SalesOrdersList';
import Reports from '../pages/reports/Reports';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute allowedRoles={[1, 2]} />}>
        <Route element={<Layout />}>
          {/* Staff & Admin Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/stock" element={<StockManagement />} />
          <Route path="/stock-logs" element={<StockLogsList />} />
          <Route path="/sales-orders" element={<SalesOrdersList />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[2]} />}>
        <Route element={<Layout />}>
          {/* Admin Only Routes */}
          <Route path="/users" element={<UserList />} />
          <Route path="/warehouses" element={<WarehousesList />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/suppliers" element={<SuppliersList />} />
          <Route path="/purchase-orders" element={<PurchaseOrdersList />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
