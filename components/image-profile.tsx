import React, { useState } from 'react';
import { useStoreActions, useStoreState } from '../state/hooks';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles';
import firebaseUtils from '../utils/firebase-utils';

interface ImageProfileProps {
  name: string;
  description: string;
}

const ImageProfile: React.FC<ImageProfileProps> = ({ name, description }) => {
  const {updateSignedInAuthUserDataAsync} = useStoreActions((actions) => actions);
  const { auth } = useStoreState((state) => state);
  const [imageUrl] = useState<string | null | undefined >(auth.user.imageUrl || null);
  


const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uploadResult = await firebaseUtils.uploadImageAsync(result.assets[0].uri);
        const payload = {
          ...auth.user,
          imageUrl: uploadResult,
        }
        updateSignedInAuthUserDataAsync(payload);

        
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