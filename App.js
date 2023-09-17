import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useGallery } from './src/use-gallery';

export default function App() {
  const { pinkImage, deleteImage, imageWithAddButton } = useGallery();

  // 화면의 가로길이 구하기
  const width = Dimensions.get('screen').width;
  const columnSize = width / 3;

  // 갤러리 열기
  const onPressOpenGallery = () => {
    pinkImage();
  };

  // 이미지 삭제
  const onLongPressImage = (imageId) => deleteImage(imageId);

  const renderItem = ({ item: { id, uri }, index }) => {
    // + 클릭했을경우
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: 'lightgray',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 45, fontWeight: '100' }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image source={{ uri }} style={{ width: columnSize, height: columnSize }} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={imageWithAddButton} renderItem={renderItem} numColumns={3} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
});
