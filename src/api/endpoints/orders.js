import api from '../axios';

export const getPurchaseOrders = async () => {
  const response = await api.get('/api/v1/purchase-orders');
  return response.data;
};

export const getSalesOrders = async () => {
  const response = await api.get('/api/v1/sales-orders');
  return response.data;
};
