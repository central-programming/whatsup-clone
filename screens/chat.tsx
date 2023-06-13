import { KeyboardAvoidingView, Platform, Keyboard, KeyboardStatic } from "react-native";
import { ChatScreenProps } from "../types/navigator";
import { Asset } from 'expo-asset';
import { styles } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback } from "react";
import ChatBody from "../components/chat-body";
import ChatFooter from "../components/chat-footer";
import { ChatUI } from "../utils/chatUI";
const bg = Asset.fromModule(require('../assets/images/chat-bg.png')).uri;

export default function ChatScreen({ navigation }: ChatScreenProps) {
    const [message, setMessage] = useState('')
    const chatUI = new ChatUI(Keyboard, message, setMessage)
    const handleSendMesssage = useCallback(() => {
        chatUI.resetTextfield()
    }, [message])


    return (
        <SafeAreaView edges={['right', 'bottom', 'left']} style={[styles.flex1, styles.column]} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100} style={styles.flex1}>
                <ChatBody chatUI={chatUI} />
                <ChatFooter message={message} handleSendMesssage={handleSendMesssage} chatUI={chatUI} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

