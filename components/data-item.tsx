import React from 'react';
import { User } from '../types/user';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import { styles } from '../styles';

const DataItem = ((user: User) => (
    <TouchableWithoutFeedback  key={user.uid} >
       <View style={[styles.row, styles.dataItemContainer]}>
      <View style={[styles.row, styles.xCenter, styles.yCenter]}>
      {user.profileImage && <Image style={styles.dataItemImage} source={{ uri: user.profileImage }} />}
        <Text style={[styles.dataItemTitle]}>{`${user.firstName} ${user.lastName}`}</Text>
      </View>
       
       </View>
    </TouchableWithoutFeedback>
))

export default DataItem;