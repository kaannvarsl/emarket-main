import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomTabBar from './CustomTabBar'; 
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2A59FE',
          },
          headerTintColor: '#fff',
          headerTitle: 'E-Market',
          headerTitleAlign: 'left',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2A59FE',
          },
          headerTintColor: '#fff',
          headerTitle: 'E-Market',
          headerTitleAlign: 'left', 
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2A59FE',
          },
          headerTintColor: '#fff',
          headerTitle: 'E-Market',
          headerTitleAlign: 'left', 
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2A59FE',
          },
          headerTintColor: '#fff',
          headerTitle: 'E-Market',
          headerTitleAlign: 'left', 
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
