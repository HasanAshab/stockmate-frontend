import api from '../axios';

export const getStockLogs = async () => {
  const response = await api.get('/api/v1/stock-logs');
  return response.data;
};

export const submitStockIn = async (data) => {
  const response = await api.post('/api/v1/stock-logs', { ...data, type: 'in' });
  return response.data;
};

export const submitStockOut = async (data) => {
  const response = await api.post('/api/v1/stock-logs', { ...data, type: 'out' });
  return response.data;
};

export const submitStockTransfer = async (data) => {
  const response = await api.post('/api/v1/stock-logs/transfer', data);
  return response.data;
};
