import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAllAppCache } from '../services/storage';
type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
  authReady: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  logout: async () => {},
  authReady: false,
});

const decodeJwtExp = (token: string): number | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

    type GlobalWithAtob = typeof globalThis & {
      atob?: (data: string) => string;
    };

    const atobFn = (globalThis as GlobalWithAtob).atob;
    if (!atobFn) return null;

    const payload = JSON.parse(atobFn(padded));

    return typeof payload.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(async () => {
    clearLogoutTimer();
    await AsyncStorage.removeItem('token');
    await clearAllAppCache();
    setIsLoggedIn(false);
  }, [clearLogoutTimer]);

  const checkTokenAndScheduleLogout = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      clearLogoutTimer();
      setIsLoggedIn(false);
      setAuthReady(true);
      return;
    }

    const exp = decodeJwtExp(token);

    // If decode fails, keep user logged in and let API 401 handle fallback logout.
    if (!exp) {
      setIsLoggedIn(true);
      setAuthReady(true);
      return;
    }

    const msUntilExpiry = exp * 1000 - Date.now();

    if (msUntilExpiry <= 0) {
      await AsyncStorage.removeItem('token');
      await clearAllAppCache();
      clearLogoutTimer();
      setIsLoggedIn(false);
      setAuthReady(true);
      return;
    }

    clearLogoutTimer();
    logoutTimerRef.current = setTimeout(() => {
      void logout();
    }, msUntilExpiry);

    setIsLoggedIn(true);
    setAuthReady(true);
  }, [clearLogoutTimer, logout]);

  useEffect(() => {
    void checkTokenAndScheduleLogout();
    return clearLogoutTimer;
  }, [checkTokenAndScheduleLogout, clearLogoutTimer]);

  // When login sets isLoggedIn=true, schedule timer immediately.
  useEffect(() => {
    if (isLoggedIn) {
      void checkTokenAndScheduleLogout();
    } else {
      clearLogoutTimer();
    }
  }, [isLoggedIn, checkTokenAndScheduleLogout, clearLogoutTimer]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logout, authReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
