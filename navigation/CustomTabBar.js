// CustomTabBar.js
import React,{useEffect} from 'react';
import { View, TouchableOpacity, Image, StyleSheet,Text } from 'react-native';
import { useNavigation, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const route = useRoute();
  const cartCount = useSelector((state) => state.cartCount);
  
  useEffect(() => {

    console.log("Cart count güncellendi:", cartCount);
  }, [cartCount]);

  const navigationIndex = state.routes.indexOf(route);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const tabIcons = {
    Home: require('../assets/home.png'),
    Cart: require('../assets/shopping-cart.png'),
    Favorites: require('../assets/star.png'),
    Profile: require('../assets/user.png'),
  };
  
  const headerTitle = focusedOptions.title || route.name;

  const tintColor = navigationIndex === state.index ? '#2A59FE' : 'black';

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#2A59FE', 
      },
      headerTintColor: '#fff', 
      headerTitle: headerTitle, 
    });
  }, [headerTitle]);

 
  const getTabBarColor = (routeName) => {
    const focusedRouteName = getFocusedRouteNameFromRoute(route) || '';
    return focusedRouteName === routeName ? '#2A59FE' : 'transparent';
  };

  return (
 
        <View style={styles.tabBarContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = navigationIndex === index;
      
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
      
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
      
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
      
            return (
                
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.tabBarButton,
                  { 
                    backgroundColor: getTabBarColor(route.name),
                    borderColor: isFocused ? '#2A59FE' : 'transparent',
                  }
                ]}
              >
                
               <Image
               source={tabIcons[route.name]}
              style={{ width: isFocused ? 35 : 30, height: isFocused ? 35 : 30, tintColor: isFocused ? 'white' : 'black' }}
/>
          {route.name === 'Cart' && cartCount > 0 && (
            <View style={styles.cartCountBadge}>
              <Text style={styles.cartCountText}>{cartCount}</Text>
            </View>
          )}
              </TouchableOpacity>
            );
          })}
          
        </View>
      );6
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20
  },
  cartCountBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
  },
});

export default CustomTabBar;
