import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const defaultAlbum = {
  id: 1,
  title: '기본',
};

export const useGallery = () => {
  const [images, setImages] = useState([]); // 선택된 이미지
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum); // 현재 선택된 앨범
  const [albums, setAlbums] = useState([defaultAlbum]); // 앨범 리스트
  const [textInputModalVisible, setTextInputMVisible] = useState(false); // 모달 온오프
  const [bicImageModalVisible, setBigImageMVisible] = useState(false); // 모달 온오프
  const [albumTitle, setAlbumTitle] = useState(''); // 앨범 이름
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 앨범 드롭다운 효과
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 확대모달에 들어갈 이미지

  // 이미지 추가
  const pinkImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        alblumId: selectedAlbum.id,
      };
      setImages([...images, newImage]);
    }
  };

  // 이미지 삭제 (alert)
  const deleteImage = (imageId) => {
    Alert.alert('이미지를 삭제하시겠습니까?', '', [
      {
        style: 'cancel',
        text: '아니요',
      },
      {
        text: '네',
        onPress: () => {
          const newImage = images.filter((image) => image.id !== imageId);
          setImages(newImage);
        },
      },
    ]);
  };

  // 모달 오픈
  const openTextInputModal = () => setTextInputMVisible(true);
  const closeTextInputModal = () => setTextInputMVisible(false);

  const openBigImageModal = () => setBigImageMVisible(true);
  const closeBigImageModal = () => setBigImageMVisible(false);

  // 드롤 다운 오픈
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  // 앨범 추가
  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };
    setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  // 선택된 앨범 구하기
  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  // modal backdrop 누르면 닫기
  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  };

  // 앨범 삭제
  const deleteAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert('기본 앨범은 삭제할 수 없습니다.');
      return;
    }
    Alert.alert('앨범을 삭제하시겠습니까?', '', [
      {
        style: 'cancel',
        text: '아니요',
      },
      {
        text: '네',
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumId);
          setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  // textinput 초기화
  const resetAlbumTitle = () => setAlbumTitle('');

  // 선택된 앨범에 맞는 이미지 표출
  const filteredImages = images.filter((image) => image.alblumId === selectedAlbum.id);

  // 배열 마지막에 "+" 추가
  const imageWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: '',
    },
  ];

  return {
    imageWithAddButton,
    selectedAlbum,
    textInputModalVisible,
    albumTitle,
    pinkImage,
    deleteImage,
    openTextInputModal,
    closeTextInputModal,
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
  };
};
