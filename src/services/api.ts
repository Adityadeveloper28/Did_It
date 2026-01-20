import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Platform } from 'react-native';

const api = axios.create({
  baseURL: 'http://10.0.2.2:5000/api',
});

// attach token to each request if available
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to show errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.error || error.response.data?.message;
      if (message && Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.LONG);
      }
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
