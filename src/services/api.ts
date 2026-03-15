import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Platform } from 'react-native';
import { Config } from 'react-native-config';

const api = axios.create({
baseURL: Config.API_URL || 'http://10.0.2.2:5000/api'

});

let logoutCallback: (() => void) | null = null;
let isLoggingOut = false;

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback;
};

const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }
};

const decodeJwtExp = (token: string): number | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

    type GlobalWithAtob = typeof globalThis & {
      atob?: (data: string) => string;
    };

    const g = globalThis as GlobalWithAtob;
    const atobFn = typeof g.atob === 'function' ? g.atob : null;

    if (!atobFn) return null;

    const payload = JSON.parse(atobFn(padded));
    return typeof payload.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string, skewSeconds = 30) => {
  const exp = decodeJwtExp(token);
  if (!exp) return false; // if decode fails, fallback to server 401 handling
  const now = Math.floor(Date.now() / 1000);
  return exp <= now + skewSeconds;
};

const forceLogout = async (message: string) => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    await AsyncStorage.removeItem('token');
    logoutCallback?.();
    showToast(message);
  } finally {
    setTimeout(() => {
      isLoggingOut = false;
    }, 300);
  }
};

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    if (isTokenExpired(token)) {
      await forceLogout('Session expired. Please login again.');
      return Promise.reject(new Error('Session expired'));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.error || error.response.data?.message;

      if (status === 401) {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          await forceLogout('Session expired. Please login again.');
        }
      } else if (message) {
        showToast(message);
      }

      console.log('Error status:', status);
      console.log('Error data:', error.response.data);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
