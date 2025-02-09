// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Payment Service
export const paymentService = {
  createOrder: async (cartItems, userId) => {
    try {
      const { data } = await api.post('/payments/create-order', { cartItems, userId });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create order',
      };
    }
  },

  capturePayment: async (orderID) => {
    try {
      const { data } = await api.post('/payments/capture-payment', { orderID });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to capture payment',
      };
    }
  },
};
