import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/accounts/';  // Update with your backend URL

// Register new user
export const register = (userData) => {
  return axios.post(API_URL + 'register/', userData);
};

// Login user and receive tokens
export const login = (credentials) => {
  return axios.post(API_URL + 'login/', credentials)
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      return response.data;
    });
};

// Logout user by removing tokens
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Get current access token
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getAccessToken();
};

// Get auth header for axios requests
export const authHeader = () => {
  const token = getAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};
