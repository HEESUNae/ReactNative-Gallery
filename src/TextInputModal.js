import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

const TextInputModal = ({ modalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackdrop }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
          <SafeAreaView style={{ width: '100%', position: 'absolute', bottom: 0 }}>
            <TextInput
              placeholder="앨범명을 입력해주세요."
              value={albumTitle}
              onChangeText={setAlbumTitle}
              style={{ width: '100%', padding: 10, borderWidth: 0.5, borderColor: 'lightgray' }}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default TextInputModal;
