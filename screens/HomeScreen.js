import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,Dimensions,TextInput,Image, TouchableOpacity
, FlatList,KeyboardAvoidingView,Platform } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { fetchProductsRequest } from '../src/redux/actions';
import { ScrollView } from 'react-native-virtualized-view';
import { addToCart,addToFavorites,removeToFavorites,sortProductsByPrice } from '../src/redux/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterModal from './FilterModal';

const HomeScreen = ({navigation}) => {
    
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const searchIcon = require('../assets/loupe.png')
    const fav = require('../assets/star.png')
    const favorites = useSelector((state) => state.favorites);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [sortType, setSortType] = useState(null);

    const [filteredPrice, setFilteredPrice] = useState([]);
    const products = useSelector((state) => state.products);
    console.log('AllProdutcs:', products);

    useEffect(() => {
        dispatch(fetchProductsRequest());
      }, []);
    
      const handleSearch = (text) => {
        setSearchQuery(text);
        filterProducts(text);
      };
    
      const filterProducts = (query) => {
        const filtered = allProducts.filter((product) => {
          return product.name && product.name.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredProducts(filtered);
      };
    
      const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        console.log("Added to cart:", item);
      };

      const handleAddToFavorites = (item) => {
        dispatch(addToFavorites(item));
        console.log("Added to favorites:", item);
      };
    
      const handleRemoveFromFavorites = (item) => {
        dispatch(removeToFavorites(item));
        console.log("Removed from favorites:", item);
      };
      
      const isFavorite = (item) => {
        return favorites.some((favorite) => favorite.id === item.id);
      };
      
      
      
      const handleSortPrice = (type) => {
        console.log('Sorting by:', type);
        dispatch(sortProductsByPrice(type));
        setFilterModalVisible(false);
      };
    
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <View style={styles.ınputContainer}>
        
              <Image source={searchIcon} color="#842840" style={{marginLeft: width * 0.03,width:15,height:15}}>

              </Image>
            
              <TextInput
              onFocus={() => {
                
              }}
            
                style={{paddingHorizontal: 10,height: height * 0.06, width: width * 0.7}}
                placeholderTextColor={'gray'}
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
              ></TextInput>
         
            </View>
      <View style={styles.filter}>
       <Text style={styles.text}>Filters:</Text>
       <TouchableOpacity style ={styles.filterButton}
         onPress={() => setFilterModalVisible(true)}>
        <Text style={styles.text2}>
            Select Filter
        </Text>
       </TouchableOpacity>

      </View>
      <FilterModal
  isVisible={isFilterModalVisible}
  onClose={() => setFilterModalVisible(false)}
  onSortPrice={handleSortPrice}
/>
      <View style={{flex:1,backgroundColor:'white',top:height *0.09}}>
      <View style ={styles.flatListContainer}>
        <ScrollView 
        showsVerticalScrollIndicator={false}>
            <FlatList
             ListFooterComponent={<View />}
             ListFooterComponentStyle={{height:100}}
            data={searchQuery ? filteredProducts : allProducts}
            keyExtractor={(item) => (item.name ? item.name.toString() : Math.random().toString())}
             renderItem={({item}) => (
                <View style={{alignSelf:'center'}}>
                <TouchableOpacity style={styles.itemContainer}  onPress={() => {navigation.navigate('ProductDetail',  {productName: item.name,productImage:item.image,productPrice:item.price,productDescription:item.description})}}>
                <Image source={{ uri: item.image }} style={styles.imageStyle}
                >
        
                </Image>
               
                </TouchableOpacity>
                <View style={styles.itemContainer2}>
                <Text style={{alignSelf:'center',width:width *0.45,textAlign:'left',left:10}}>{item.price + '$'}</Text>
                <Text style={{alignSelf:'center',width:width *0.45,textAlign:'left',left:10}}>{item.name}</Text>
                <TouchableOpacity style={styles.addCartButton} 
                onPress={() => {
                  handleAddToCart(item);
                   
                    // navigation.navigate('CartScreen');
                  }}>
                <Text style ={{alignSelf:'center',color:'white'}}>
                Add to Cart
                </Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.favoritesButton}   onPress={() => {
              if (isFavorite(item)) {
                handleRemoveFromFavorites(item);
              } else {
                handleAddToFavorites(item);
              }
            }}>
              <Icon
                name={isFavorite(item) ? 'star' : 'star-outline'}
                size={30}
                color={isFavorite(item) ? 'yellow' : 'grey'}
                style={{ alignSelf: 'center' }}
              />
               </TouchableOpacity>
                </View>
             )}
             numColumns={2}
             horizontal={false}
             scrollEnabled={true}
             contentContainerStyle={{flexGrow:1,paddingBottom:height * 0.35 }}
             style={{alignSelf:'center'}}>
                
            </FlatList>
        </ScrollView>
        </View>
      </View>   
      
      
    </KeyboardAvoidingView>
  );
};
const {height, width} = Dimensions.get('screen')
const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor:'white',
   
    alignItems: 'center',
  },
  text: {
    flex:1,
    top:5,
    fontSize: 20,
    color:'black',
    right:width *0.025
   
  },
  Input:{
    top:height * -0.32,
    width:width * 0.95,
    height:height *0.05,
    backgroundColor:'#F5F5F5',
    borderWidth:1,
    borderRadius:10,
    borderColor:'lightgrey'
  },
  ınputContainer:{
    flexDirection:'row'
    ,borderRadius:10
    ,height: height * 0.05
    ,width: width * 0.93
    ,borderColor: 'lightgray'
    ,borderWidth: 1.2, 
    top:height *0.04,
    alignItems:'center', 
    alignSelf:'center'
  },
  filter:{
  justifyContent: 'space-between',
  marginHorizontal: 10,
  flexDirection:'row',
  top:height * 0.07,
  
  left:20
  },
  text2:{
    color:'black',
    alignSelf:'center',
   
  },
  flatListContainer:{
    flex:1,
    top:height * 0.01,
  },
  itemContainer:{
    alignSelf:'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:width *0.42,
    height:height *0.2,
    backgroundColor: 'lightgrey',
    margin: 20, 
    
  },
  filterButton:{ 
    right:35,
    justifyContent:'center',
    width:145,
    height:38,
    backgroundColor:'#D9D9D9',
    alignSelf:'center'
  },
  itemContainer2:{
     flexDirection:'column',
     marginBottom:15,
     gap:width * 0.035
  },
  addCartButton:{
    width:width *0.4,
    height:height * 0.05,
    backgroundColor:'#2A59FE',
    justifyContent:'center',
    alignSelf:'center',
    
    borderRadius:5
  },
  imageStyle:{
    width:width *0.42,
    height:height *0.2,
  },
  favoritesButton:{
    height:35,
    width:35,
    position: 'absolute',
    top: height * 0.04,
    right: width * 0.07,
    backgroundColor:'rgba(211, 211, 211, 0.9)',
   
   

    borderRadius: 5,
  }
});

export default HomeScreen;
