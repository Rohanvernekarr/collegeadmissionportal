import axios from 'axios';

const API_URL = 'http://localhost:8000/api/accounts/';

export const register = (userData) => axios.post(API_URL + 'register/', userData);

export const login = (credentials) =>
  axios.post(API_URL + 'login/', credentials).then(res => {
    if (res.data.access) {
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
    }
    return res.data;
  });

export const logout = () => {
  localStorage.clear();
};

export const getAccessToken = () => localStorage.getItem('access_token');

export const authHeader = () => {
  const token = getAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const isLoggedIn = () => !!getAccessToken();
