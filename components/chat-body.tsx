
import React from 'react'
import { TouchableWithoutFeedback, ImageBackground } from 'react-native'
import { styles } from "../styles";
import { Asset } from 'expo-asset';
import { ChatUI } from "../utils/chatUI";
const bg = Asset.fromModule(require('../assets/images/chat-bg.png')).uri;

interface ChatBodyProps {
    chatUI: ChatUI;
}
export default function ChatBody({ chatUI }: ChatBodyProps) {
    return (
        <TouchableWithoutFeedback onPress={chatUI.dismissKeyboard}>
            <ImageBackground source={{ uri: bg }} style={[styles.flex1]} >
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}