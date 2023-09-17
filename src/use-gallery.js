import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const useGallery = () => {
  const [images, setImages] = useState([]); // 선택된 이미지

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

  // 배열 마지막에 "+" 추가
  const imageWithAddButton = [
    ...images,
    {
      id: -1,
      uri: '',
    },
  ];

  return {
    imageWithAddButton,
    pinkImage,
    deleteImage,
  };
};
