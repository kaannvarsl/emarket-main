// FilterModal.js

import React,{useState} from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterModal = ({ isVisible, onClose, onSortPrice }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ top: height * -0.15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, left: width * 0.03 }}>Select Filter Options</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name={'close-outline'} size={25} color={'black'} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ alignSelf: 'flex-start', top: height * -0.12, width: width * 0.5, height: height * 0.05, backgroundColor: '#2A59FE', justifyContent: 'center', borderRadius: 20 }}
            onPress={() => onSortPrice('lowToHigh')}
          >
            <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>Sort by Price (Low to High)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: 'flex-start', top: height * -0.09, width: width * 0.5, height: height * 0.05, backgroundColor: '#2A59FE', justifyContent: 'center', borderRadius: 20 }}
            onPress={() => onSortPrice('highToLow')}
          >
            <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>Sort by Price (High to Low)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.5,
    width: width * 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 40,
    top: height * 0.3,
  },
  closeButton: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'lightgrey',
    left: width * 0.2,
  },
});

export default FilterModal;
