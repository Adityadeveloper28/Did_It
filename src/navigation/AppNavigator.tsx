import { View, Text } from 'react-native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionListScreen from '../screens/ActionListScreen';
import AddActionScreen from '../screens/AddActionScreen';
import ProofListScreen from '../screens/ProofListScreen';
import AddProofScreen from '../screens/AddProofScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ActionList"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerShadowVisible: false,
        headerTintColor: '#2E2942',
        headerTitleStyle: {
          color: '#2C2C2C',
          fontSize: 22,
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="ActionList"
        component={ActionListScreen}
        options={({ navigation }) => ({
          title: 'ProofLog',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={styles.profileIconButton}
              hitSlop={8}
            >
              <FontAwesome6
                iconStyle="solid"
                name="circle-user"
                size={18}
                color="#4C63FF"
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="AddAction"
        component={AddActionScreen}
        options={{ title: 'Add Action' }}
      />
      <Stack.Screen
        name="ProofList"
        component={ProofListScreen}
        options={{ title: 'Proof List' }}
      />
      <Stack.Screen
        name="AddProof"
        component={AddProofScreen}
        options={{ title: 'Add Proof' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  profileIconButton: {
    width: 30,
    height: 30,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F5FB',
    borderWidth: 1,
    borderColor: '#ECE8F3',
  },
});

export default AppNavigator;
