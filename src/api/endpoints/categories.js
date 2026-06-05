import api from '../axios';

export const getCategories = async () => {
  const response = await api.get('/api/v1/categories');
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post('/api/v1/categories', data);
  return response.data;
};

export const updateCategory = async ({ id, data }) => {
  const response = await api.put(`/api/v1/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/api/v1/categories/${id}`);
  return response.data;
};
