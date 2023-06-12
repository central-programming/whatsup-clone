import { View, Text, Button, ImageBackground, TouchableOpacity } from "react-native";
import { ChatScreenProps } from "../types/navigator";
import { Asset } from 'expo-asset';
import { styles } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
const bg = Asset.fromModule(require('../assets/images/chat-bg.png')).uri;

export default function ChatScreen({ navigation }: ChatScreenProps) {
    return (
        <SafeAreaView
            edges={['right', 'bottom', 'left']}
            style={[styles.flex1, styles.column]}
        >
            <ImageBackground source={{ uri: bg }} style={[styles.flex1]}>
            </ImageBackground>
            <View style={[styles.row, styles.chatFooterBar, styles.spread]}>
                <TouchableOpacity onPress={() => { console.log('pressed') }} style={[styles.xCenter,styles.yCenter]}>
                    <Feather name="plus" size={24} style={styles.colorAlert} />
                </TouchableOpacity>
                <TextInput placeholder="Type a message"  style={[styles.flex1, styles.chatFooterTextBox]}/>
                <TouchableOpacity onPress={() => { console.log('pressed') }} style={[styles.xCenter,styles.yCenter]}>
                    <Feather name="camera" size={24} style={styles.colorAlert} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}