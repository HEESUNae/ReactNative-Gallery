import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useGallery } from './src/use-gallery';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';

export default function App() {
  const {
    pinkImage,
    deleteImage,
    imageWithAddButton,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    onPressBackdrop,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
  } = useGallery();

  // 화면의 가로길이 구하기
  const width = Dimensions.get('screen').width;
  const columnSize = width / 3;

  // 갤러리 열기
  const onPressOpenGallery = () => {
    pinkImage();
  };

  // 이미지 삭제
  const onLongPressImage = (imageId) => deleteImage(imageId);

  // 앨범 추가
  const onPressAddAlbum = () => {
    openModal();
  };

  // 인풋값 저장
  const onSubmitEditing = () => {
    if (!albumTitle) return;
    addAlbum();
    closeModal();
    resetAlbumTitle();
  };

  // 드롭다운 열기
  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // 앨범선택시 함수
  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropdown();
  };

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
      <MyDropDownPicker
        isDropdownOpen={isDropdownOpen}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        albums={albums}
        onPressAlbum={onPressAlbum}
      />
      <TextInputModal
        modalVisible={modalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressBackdrop}
      />
      <FlatList data={imageWithAddButton} renderItem={renderItem} numColumns={3} style={{ zIndex: -1 }} />
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
