import api from '../axios';

// Mocking the backend for now so the UI is fully functional

export const getUsers = async (page = 1) => {
  await new Promise(r => setTimeout(r, 500));
  return {
    data: [
      { id: 1, name: "Admin User", email: "admin@example.com", role: 2, is_active: true, created_at: new Date().toISOString() },
      { id: 2, name: "Staff User", email: "staff@example.com", role: 1, is_active: true, created_at: new Date().toISOString() },
      { id: 3, name: "Inactive User", email: "inactive@example.com", role: 1, is_active: false, created_at: new Date().toISOString() },
    ],
    meta: { current_page: 1, last_page: 1, total: 3 }
  };
};

export const createUser = async (data) => {
  await new Promise(r => setTimeout(r, 500));
  return { data: { ...data, id: Math.floor(Math.random() * 1000) } };
};

export const updateUser = async ({ id, data }) => {
  await new Promise(r => setTimeout(r, 500));
  return { data };
};

export const toggleUserStatus = async (id) => {
  await new Promise(r => setTimeout(r, 500));
  return { success: true };
};
