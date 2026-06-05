import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Session-based authentication does not require manual token injection

// Helper to flatten JSON API spec responses to flat objects
const flattenJsonApi = (item) => {
  if (Array.isArray(item)) {
    return item.map(flattenJsonApi);
  }
  if (item && typeof item === 'object' && item.attributes) {
    return {
      id: item.id,
      ...item.attributes,
    };
  }
  return item;
};

api.interceptors.response.use((response) => {
  // Normalize JSON API format for the frontend
  if (response.data && response.data.data !== undefined) {
    response.data.data = flattenJsonApi(response.data.data);
  } else if (response.data && response.data.attributes) {
    response.data = flattenJsonApi(response.data);
  }
  return response;
}, (error) => {
  if (error.response?.status === 401 || error.response?.status === 419) {
    localStorage.removeItem('authUser');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
