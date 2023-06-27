import React, { useState } from 'react';
import { useStoreState } from '../state/hooks';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { styles } from '../styles';


interface ImageProfileProps {
  name: string;
  description: string;
  handleImageUpload: () => Promise<void>;
  isLoading?: boolean;
  profileImage: string | null | undefined;
}

const ImageProfile: React.FC<ImageProfileProps> = ({ name, description, handleImageUpload, isLoading = false, profileImage }) => {
 



  return (

    <>
      {
        isLoading ? (
          <View>
            <ActivityIndicator size='small' color='blue' />
          </View>
        ) : (
          <TouchableOpacity style={styles.imageProfileContainer} onPress={handleImageUpload}>
            {profileImage ? (
              <Image style={styles.image} source={{ uri: profileImage }} />
            ) : (
              <View style={styles.placeholder} />
            )}
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </TouchableOpacity>
        )
      }
    </>
  );
};


export default ImageProfile;