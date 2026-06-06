import api from '../axios';

export const getStockLogs = async () => {
  const response = await api.get('/api/v1/stock-logs');
  return response.data;
};

export const submitStockIn = async (data, typeId) => {
  const response = await api.post('/api/v1/stock-logs', { ...data, type: typeId });
  return response.data;
};

export const submitStockOut = async (data, typeId) => {
  const response = await api.post('/api/v1/stock-logs', { ...data, type: typeId });
  return response.data;
};

export const submitStockTransfer = async (data) => {
  const response = await api.post('/api/v1/stock-logs/transfer', data);
  return response.data;
};
