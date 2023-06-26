import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles';
import firebaseUtils from '../utils/firebase-utils';

interface ImageProfileProps {
  name: string;
  description: string;
}

const ImageProfile: React.FC<ImageProfileProps> = ({ name, description }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);


const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUrl(result.assets[0].uri);
        const uploadResult = await firebaseUtils.uploadImageAsync(result.assets[0].uri);
      }
      
};

  return (
 
    <TouchableOpacity style={styles.imageProfileContainer} onPress={handleImageUpload}>
      {imageUrl ? (
        <Image style={styles.image} source={{ uri: imageUrl }} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};


export default ImageProfile;