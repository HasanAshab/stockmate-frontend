import api from '../axios';

export const getSuppliers = async () => {
  const response = await api.get('/api/v1/suppliers');
  return response.data;
};

export const createSupplier = async (data) => {
  const response = await api.post('/api/v1/suppliers', data);
  return response.data;
};

export const updateSupplier = async ({ id, data }) => {
  const response = await api.put(`/api/v1/suppliers/${id}`, data);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await api.delete(`/api/v1/suppliers/${id}`);
  return response.data;
};
