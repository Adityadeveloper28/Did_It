import { View, Text } from 'react-native';
import React from 'react';
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
    <Stack.Navigator initialRouteName="ActionList">
      <Stack.Screen
        name="ActionList"
        component={ActionListScreen}
        options={({ navigation }) => ({
          title: 'ProofLog',
          headerRight: () => (
            <Text
              style={{ marginRight: 16, fontSize: 16, color: 'blue' }}
              onPress={() => navigation.navigate('Profile')}
            >
              <FontAwesome6 name="circle-user" size={24} color="blue" />
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="AddAction"
        component={AddActionScreen}
        options={{ title: 'Add  Action' }}
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

export default AppNavigator;
