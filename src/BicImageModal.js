import React from 'react';
import { Image, Modal, Pressable, View } from 'react-native';

const BicImageModal = ({ modalVisible, onPressBackdrop, selectedImage }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(75,75,75,0.8)' }}
      >
        <Pressable>
          <Image source={{ uri: selectedImage?.uri }} style={{ width: 280, height: 280 }} resizeMode="contain" />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default BicImageModal;
