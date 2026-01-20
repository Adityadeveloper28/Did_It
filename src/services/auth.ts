import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await api.post('/auth/register', {
    name,
    email,
    password,
  });
  console.log(res.data);
  await AsyncStorage.setItem('token', res.data.token);
};

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', {
    email,
    password,
  });
  console.log(res.data);
  await AsyncStorage.setItem('token', res.data.token);
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

export const getProfile = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
