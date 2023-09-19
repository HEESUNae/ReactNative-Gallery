import React from 'react';
import { Image, Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ justifyContent: 'center', paddingHorizontal: 20, height: '100%' }}
    >
      <SimpleLineIcons name={iconName} size={12} color={disabled ? 'transparent' : 'black'} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  );
};

const BicImageModal = ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(75,75,75,0.8)' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ArrowButton iconName={'arrow-left'} onPress={onPressLeftArrow} disabled={!showPreviousArrow} />

          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{ width: 280, height: 280, backgroundColor: 'white' }}
              resizeMode="contain"
            />
          </Pressable>
          <ArrowButton iconName={'arrow-right'} onPress={onPressRightArrow} disabled={!showNextArrow} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default BicImageModal;
