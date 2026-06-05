import api from '../axios';

export const getUsers = async (page = 1) => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post('/users', data);
  return response.data;
};

export const updateUser = async ({ id, data }) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await api.patch(`/users/${id}/toggle-status`);
  return response.data;
};
