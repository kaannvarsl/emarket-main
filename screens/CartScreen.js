import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { increaseQuantity,
decreaseQuantity,removeToCart } from '../src/redux/actions';

const CartScreen = () => {
   
    const dispatch = useDispatch();
    const { height, width } = Dimensions.get('screen');
    const cartItems = useSelector((state) => state.cartItems);
    
 
    
    const calculateTotal = (items) => {
        return items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
      };
    
      const [totalPrice, setTotalPrice] = useState(calculateTotal(cartItems));
    
      const handleQuantityChange = (item, action) => {
        if (action === 'increase') {
          dispatch(increaseQuantity(item.id));
          setTotalPrice((prevTotal) => prevTotal + item.price);
        } else if (action === 'decrease' && item.quantity > 0) {
          dispatch(decreaseQuantity(item.id));
          setTotalPrice((prevTotal) => prevTotal - item.price);
        }
      };
     

      useEffect(() => {
        setTotalPrice(calculateTotal(cartItems));

        
      }, [cartItems]);
  

    


    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={({ item }) => (
         
            <View style={{ flexDirection: 'row', flex: 1 }}>
            
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width * 0.89,
                  backgroundColor: 'white',
                  height: height * 0.05,
                  top: height * 0.02,
                  left: width * -0.001,
                  margin: 20,
                }}
              >
                <Text style={{ alignSelf: 'flex-start', fontSize: 20, width: width * 0.55, color: 'black' }}>{item.name}</Text>
                <Text style={{ fontSize: 18, alignSelf: 'flex-start', top: height * 0.01, height: height * 0.05 }}>{item.price + '$'}</Text>
              </View>
              <View
                style={{
                  width: width * 0.28,
                  height: height * 0.065,
                  backgroundColor: 'white',
                  left: width * -0.34,
                  top: height * 0.03,
                  flexDirection: 'row',
                  rowGap: width * 0.02,
                }}
              >
                <TouchableOpacity
                  style={{ width: width * 0.095, height: height * 0.065, backgroundColor: 'white', justifyContent: 'center' }}
                  onPress={() => handleQuantityChange(item, 'decrease')}
                >
                  <Text style={{ fontSize: 25, alignSelf: 'center' }}>-</Text>
                </TouchableOpacity>
                <View style={{ width: width * 0.12, height: height * 0.065, backgroundColor: '#2A59FE', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, alignSelf: 'center',color:'white' }}>{item.quantity}</Text>
                </View>
                <TouchableOpacity
                  style={{ width: width * 0.095, height: height * 0.065, backgroundColor: 'white', justifyContent: 'center' }}
                  onPress={() => handleQuantityChange(item, 'increase')}
                >
                  <Text style={{ fontSize: 25, alignSelf: 'center' }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          horizontal={false}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ backgroundColor: 'white' }}
        />
        </View>
        <View style={{ height: '15%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', left: width * -0.18 }}>
          <View style={{ left: height * 0.065, top: height * -0.01 }}>
            <Text style={{ fontSize: 18, color: '#2A59FE' }}>Total:</Text>
            <Text style={{ fontSize: 20,width:width *0.35 }}>{cartItems.length > 0 ? `${totalPrice} $` : '0 $'}</Text>
          </View>
          <TouchableOpacity style={styles.completeButton}>
            <Text style={{ alignSelf: 'center', color: 'white' }}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
const {height, width} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex:1,
    width:width * 0.98,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 24,
   
  },
  completeButton:{
    width:width *0.4,
    height:height * 0.05,
    backgroundColor:'#2A59FE',
    justifyContent:'center',
    alignSelf:'center',
    left:width * 0.25,
    borderRadius:5,
    top:height *-0.002
  },
});

export default CartScreen;
