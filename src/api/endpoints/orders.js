import api from '../axios';

export const getPurchaseOrders = async () => {
  const response = await api.get('/purchase-orders');
  return response.data;
};

export const getSalesOrders = async () => {
  const response = await api.get('/sales-orders');
  return response.data;
};
