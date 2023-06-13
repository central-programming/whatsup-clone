import { View, Text, Button, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, KeyboardStatic } from "react-native";
import { ChatScreenProps } from "../types/navigator";
import { Asset } from 'expo-asset';
import { styles } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
const bg = Asset.fromModule(require('../assets/images/chat-bg.png')).uri;

export default function ChatScreen({ navigation }: ChatScreenProps) {
    const [message, setMessage] = useState('')
    const chatUI = new ChatUI(Keyboard, message, setMessage)
 
    return (
        <SafeAreaView
            edges={['right', 'bottom', 'left']}
            style={[styles.flex1, styles.column]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={100}

                style={styles.flex1}>
                <TouchableWithoutFeedback onPress={chatUI.dismissKeyboard}>
                    <ImageBackground source={{ uri: bg }} style={[styles.flex1]} >
                    </ImageBackground>
                </TouchableWithoutFeedback>
                <View style={[styles.row, styles.chatFooterBar, styles.spread]}>
                    <TouchableOpacity onPress={() => { console.log('pressed') }} style={[styles.xCenter, styles.yCenter]}>
                        <Feather name="plus" size={24} style={styles.colorAlert} />
                    </TouchableOpacity>
                    <TextInput
                        value={message}
                        onChangeText={chatUI.textfieldChange}
                        placeholder="Type a message" style={[styles.flex1, styles.chatFooterTextBox]} />
                    <TouchableOpacity onPress={() => { console.log('pressed') }} style={chatUI.isTextfieldEmpty() ? styles.chatFooterInactiveButton : styles.chatFooterActiveButton}>
                        {
                            chatUI.isTextfieldEmpty() ? <Feather name="camera" size={24} style={styles.colorAlert} /> : <Ionicons name="send" size={24} style={styles.colorWhite} />
                        }
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


class ChatUI {
    Keyboard: KeyboardStatic;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    constructor(keyboard: KeyboardStatic, message: string, setMessage: React.Dispatch<React.SetStateAction<string>>) {
        this.Keyboard = keyboard;
        this.message = message;
        this.setMessage = setMessage;
    }
    dismissKeyboard = () => {
        this.Keyboard.dismiss();
    }
    textfieldChange = (text: string) => {
        this.setMessage(text)
    }
    isTextfieldEmpty = () => {
        return this.message.length === 0;
    }
}