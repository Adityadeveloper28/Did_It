import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import AuthProvider, { AuthContext } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { setLogoutCallback } from './src/services/api';

const RootNavigator = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  
  useEffect(() => {
    setLogoutCallback(logout);
  }, [logout]);
  
  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
