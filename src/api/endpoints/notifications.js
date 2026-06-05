import api from '../axios';

export const getNotifications = async () => {
  const response = await api.get('/api/v1/notifications');
  return response.data;
};

export const getUnreadNotificationsCount = async () => {
  const response = await api.get('/api/v1/notifications/unread');
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await api.patch('/api/v1/notifications/mark-all-as-read');
  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await api.patch(`/api/v1/notifications/${id}/mark-as-read`);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/api/v1/notifications/${id}`);
  return response.data;
};
