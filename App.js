import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useGallery } from './src/use-gallery';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';
import BicImageModal from './src/BicImageModal';

export default function App() {
  const {
    pinkImage,
    deleteImage,
    imageWithAddButton,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    onPressTextInputModalBackdrop,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    bicImageModalVisible,
    openBigImageModal,
    closeBigImageModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
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
    openTextInputModal();
  };

  // 인풋값 저장
  const onSubmitEditing = () => {
    if (!albumTitle) return;
    addAlbum();
    closeTextInputModal();
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

  // 선택된 앨범 id 저장
  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropdown();
  };

  // 앨범 삭제
  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  };

  // 이미지 자세히보기 모달 온오프
  const onPressImage = (image) => {
    selectImage(image);
    openBigImageModal();
  };
  const onPressBicImageModalBackdrop = () => {
    closeBigImageModal();
  };

  // 이미지 자세히보기 모달 좌우로 이동
  const onPressLeftArrow = () => {
    moveToPreviousImage();
  };
  const onPressRightArrow = () => {
    moveToNextImage();
  };

  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
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
      <TouchableOpacity onPress={() => onPressImage(image)} onLongPress={() => onLongPressImage(id)}>
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
        onLongPressAlbum={onLongPressAlbum}
      />
      <TextInputModal
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />
      <BicImageModal
        modalVisible={bicImageModalVisible}
        onPressBackdrop={onPressBicImageModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
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
