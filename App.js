import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './navigation/AppNavigator';
import ProductDetail from './screens/ProductDetail';
import CartScreen from './screens/CartScreen';


const Stack = createNativeStackNavigator();



export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
       
           <Stack.Screen 
           name='AppNavigator'
           component={AppNavigator}
           options={{headerShown: false}}
         />
          <Stack.Screen name ="ProductDetail" component={ProductDetail} options={{headerShown: false,gestureEnabled:false}}/>
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}