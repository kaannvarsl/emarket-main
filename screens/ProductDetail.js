import React,{useEffect} from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image,Text } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { addToCart,increaseQuantity } from '../src/redux/actions';
import { useDispatch,useSelector } from 'react-redux';

const ProductDetail = ({ route }) => {
    const navigation = useNavigation();
    const arrow = require('../assets/arrow.png');

    const productName = route.params?.productName;
    const productImage = route.params?.productImage;
    const productDescription = route.params?.productDescription;
    const productPrice = route.params?.productPrice;
   
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems);

    const handleAddToCart = () => {
        const item = {
          productName,
          productImage,
          productDescription,
          productPrice,
          
        };
        const existingItem = cartItems.find(item => item.productName === productName);
        
        if (existingItem) {
            dispatch(increaseQuantity(existingItem.id));
            console.log('item quantity increased');
        } else {
            dispatch(addToCart(item));
            console.log('item added to cart');
        }
        navigation.navigate('AppNavigator', {
            screen: 'CartScreen',
            params: {
                productName: 'Example Product',
                productImage: 'example.jpg',
                productDescription: 'Example description',
                productPrice: 20,
            },
        });
      };
   

    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={{marginTop:height * 0.035,justifyContent:'center',alignItems:'center'}}>
            <Image source={arrow} style={{ width: 25, height: 25, alignSelf: 'center' }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: 'white', flex: 1, textAlign: 'center',top:height * 0.02,alignSelf:'center',left:width*-0.04}}>{productName}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image source={{ uri: productImage }} style={{ width: '90%', aspectRatio: 4/3, alignSelf: 'center', resizeMode: 'contain' }} />
              <Text style={{ alignSelf: 'center', fontSize: 20, marginTop:height *0.02 }}>{productName}</Text>
              <Text style={{ alignSelf: 'center', fontSize: 14, width: '90%',marginTop:height * 0.02 }}>{productDescription}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={{ height: '15%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style ={{left:height *0.03,top:height * -0.01}}>
            <Text style={{ fontSize: 18, color: '#2A59FE' }}>Price:</Text>
            <Text style={{ fontSize: 20 }}>{productPrice + ' $'}</Text>
          </View>
          <TouchableOpacity style={styles.addCartButton} 
            // onPress={() => {
            //     handleAddToCart(); 
            //   }}
            >
            <Text style={{ alignSelf: 'center', color: 'white' }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  
  const {height, width} = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
      top: height * -0.03,
      backgroundColor: '#2A59FE',
      padding: height * 0.02,
      height: height * 0.12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addCartButton:{
        width:width *0.4,
        height:height * 0.05,
        backgroundColor:'#2A59FE',
        justifyContent:'center',
        alignSelf:'center',
        left:width * -0.05,
        borderRadius:5,
        top:height *-0.002
      },
  });
  
  export default ProductDetail;
  
