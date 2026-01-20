import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import AuthProvider, { AuthContext } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

const RootNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
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
