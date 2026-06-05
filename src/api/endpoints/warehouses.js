import api from '../axios';

export const getWarehouses = async () => {
  const response = await api.get('/api/v1/warehouses');
  return response.data;
};

export const createWarehouse = async (data) => {
  const response = await api.post('/api/v1/warehouses', data);
  return response.data;
};

export const updateWarehouse = async ({ id, data }) => {
  const response = await api.put(`/api/v1/warehouses/${id}`, data);
  return response.data;
};

export const toggleWarehouseStatus = async (id) => {
  const response = await api.patch(`/api/v1/warehouses/${id}/toggle-status`);
  return response.data;
};
