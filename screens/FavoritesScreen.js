import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeToFavorites } from '../src/redux/actions';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
 

  const handleRemoveFromFavorites = (item) => {
    dispatch(removeToFavorites(item));
    console.log("Removed from favorites:", item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.imageStyle} />
            <TouchableOpacity
              style={styles.removeFavoritesButton}
              onPress={() => handleRemoveFromFavorites(item)}
            >
              <Icon name={'star'} size={30} color='yellow' style={styles.removeFavoritesIcon} />
            </TouchableOpacity>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price + '$'}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const { height, width } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative', 
  },
  imageStyle: {
    width: width * 0.8,
    height: height * 0.2,
  },
  itemName: {
    marginTop: 10,
    fontSize: 16,
  },
  itemPrice: {
    color: 'gray',
    marginTop: 5,
  },
  removeFavoritesButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    justifyContent:'center',
    zIndex: 1,
    height:45,
    width:45,
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.03,
    backgroundColor:'rgba(211, 211, 211, 0.9)',
    borderRadius:10
  },
  removeFavoritesIcon: {
    
    alignSelf: 'center',
    
  },
});

export default FavoritesScreen;
