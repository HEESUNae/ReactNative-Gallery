import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultAlbum = {
  id: 1,
  title: '기본',
};

const ASYNC_KEY = {
  IMAGES: 'images',
  ALBUMS: 'albums',
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

  // async storage 저장
  const _setImages = (newImage) => {
    setImages(newImage);
    AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImage));
  };
  const _setAlbums = (newAlbum) => {
    setAlbums(newAlbum);
    AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbum));
  };

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
      _setImages([...images, newImage]);
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
          _setImages(newImage);
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
    _setAlbums([...albums, newAlbum]);
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
          _setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  // 선택된 앨범에 맞는 이미지 표출
  const filteredImages = images.filter((image) => image.alblumId === selectedAlbum.id);

  // 이미지 모달 좌우이동
  const moveToPreviousImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
    const previousImageIdx = selectedImageIndex - 1;
    if (previousImageIdx < 0) return;
    const previousImage = filteredImages[previousImageIdx];
    setSelectedImage(previousImage);
  };
  const moveToNextImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
    const nextImageIdx = selectedImageIndex + 1;
    if (nextImageIdx > filteredImages.length - 1 || nextImageIdx === -1) return;
    const nextImage = filteredImages[nextImageIdx];
    setSelectedImage(nextImage);
  };
  const showPreviousArrow = filteredImages.findIndex((image) => image.id === selectedImage?.id) !== 0;
  const showNextArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !== filteredImages.length - 1;

  // textinput 초기화
  const resetAlbumTitle = () => setAlbumTitle('');

  // 배열 마지막에 "+" 추가
  const imageWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: '',
    },
  ];

  const initValues = async () => {
    // images
    const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    if (imagesFromStorage !== null) {
      const parsed = JSON.parse(imagesFromStorage);
      setImages(parsed);
    }

    // albums
    const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
    if (albumsFromStorage !== null) {
      const parsed = JSON.parse(albumsFromStorage);
      setAlbums(parsed);
    }
  };

  useEffect(() => {
    initValues();
  }, []);

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
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
