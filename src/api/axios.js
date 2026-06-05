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

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401 || error.response?.status === 419) {
    localStorage.removeItem('authUser');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
