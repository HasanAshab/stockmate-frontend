import api from '../axios';

export const updateProfile = async (data) => {
  const response = await api.put('/api/v1/profile', data);
  return response.data;
};
