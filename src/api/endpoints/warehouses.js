import api from '../axios';

export const getWarehouses = async () => {
  const response = await api.get('/warehouses');
  return response.data;
};

export const createWarehouse = async (data) => {
  const response = await api.post('/warehouses', data);
  return response.data;
};

export const updateWarehouse = async ({ id, data }) => {
  const response = await api.put(`/warehouses/${id}`, data);
  return response.data;
};

export const toggleWarehouseStatus = async (id) => {
  const response = await api.patch(`/warehouses/${id}/toggle-status`);
  return response.data;
};
