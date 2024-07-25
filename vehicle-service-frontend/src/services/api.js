import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your Django backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Components
export const getComponents = () => api.get('/components/').then(response => response.data);
export const createComponent = (data) => api.post('/components/', data).then(response => response.data);
export const updateComponent = (id, data) => api.put(`/components/${id}/`, data).then(response => response.data);
export const deleteComponent = (id) => api.delete(`/components/${id}/`).then(response => response.data);

// Vehicles
export const getVehicles = () => api.get('/vehicles/').then(response => response.data);
export const createVehicle = (data) => api.post('/vehicles/', data).then(response => response.data);
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}/`, data).then(response => response.data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}/`).then(response => response.data);

// Issues
export const getIssues = () => api.get('/issues/').then(response => response.data);
export const createIssue = (data) => api.post('/issues/', data).then(response => response.data);
export const updateIssue = (id, data) => api.put(`/issues/${id}/`, data).then(response => response.data);
export const deleteIssue = (id) => api.delete(`/issues/${id}/`).then(response => response.data);

// Repairs
export const createRepair = (data) => api.post('/repairs/', data).then(response => response.data);

// Invoices
export const getInvoices = () => api.get('/invoices/').then(response => response.data);
export const updateInvoice = (id, data) => api.put(`/invoices/${id}/`, data).then(response => response.data);

// Revenue Statistics
export const getRevenueStats = () => api.get('/invoices/revenue_stats/').then(response => response.data);

export default api;