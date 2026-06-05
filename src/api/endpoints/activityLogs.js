import api from '../axios';

export const getActivityLogs = async () => {
  const response = await api.get('/api/v1/activity-logs');
  return response.data;
};
