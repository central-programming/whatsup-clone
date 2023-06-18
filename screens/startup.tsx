import React, {useEffect} from "react";
import { View, Text, ActivityIndicator } from "react-native";
import {AsyncStorageHandler} from '../utils/local-storage';
import { styles } from "../styles";

export default function StartupScreen() {
    return (
        <View style={[styles.flex1,styles.xCenter, styles.yCenter]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}