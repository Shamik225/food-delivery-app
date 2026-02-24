import api from './api';

export const menuService = {
  getAllItems: () => api.get('/menu'),
  getItemById: (id) => api.get(`/menu/${id}`)
};