import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ActionListScreen from '../screens/ActionListScreen';
import AddActionScreen from '../screens/AddActionScreen';
import ProofListScreen from '../screens/ProofListScreen';
import AddProofScreen from '../screens/AddProofScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="ActionList">
      <Stack.Screen
        name='ActionList'
        component={ActionListScreen}
        options={{title:"ProofLog"}}
      />
      <Stack.Screen
        name='AddAction'
        component={AddActionScreen}
        options={{title:"Add  Action"}}
      />
      <Stack.Screen
        name='ProofList'
        component={ProofListScreen}
        options={{title:"Proof List"}}
      />
      <Stack.Screen
        name='AddProof'
        component={AddProofScreen}
        options={{title:"Add Proof"}}
      />
    </Stack.Navigator>

   </NavigationContainer>
  )
}

export default AppNavigator