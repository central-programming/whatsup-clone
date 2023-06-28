import { KeyboardAvoidingView, Platform, Keyboard, KeyboardStatic, View } from "react-native";
import { ChatScreenProps } from "../types/navigator";
import { Asset } from 'expo-asset';
import { styles } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useCallback, useEffect } from "react";
import ChatBody from "../components/chat-body";
import ChatFooter from "../components/chat-footer";
import { ChatUI } from "../utils";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
    HeaderButtons,
    HeaderButton,
    Item,
    HiddenItem,
    OverflowMenu,
    HeaderButtonProps,
  } from 'react-navigation-header-buttons';
const bg = Asset.fromModule(require('../assets/images/chat-bg.png')).uri;

export default function ChatScreen({ navigation }: ChatScreenProps) {
    const [message, setMessage] = useState('')
    const chatUI = new ChatUI(Keyboard, message, setMessage)
    const handleSendMesssage = useCallback(() => {
        chatUI.resetTextfield()
    }, [message])

    // const MaterialHeaderButton = (props: HeaderButtonProps) => (
    //     // the `props` here come from <Item ... />
    //     // you may access them and pass something else to `HeaderButton` if you like
    //     <HeaderButton IconComponent={MaterialIcons} iconSize={23} {...props} />
    //   );
      

    // useEffect(() => {
    //     navigation.setOptions({
    //       title: 'Demo',
    //       headerRight: () => (
    //        <View style={{marginTop:30}}>
    //          <HeaderButtons  HeaderButtonComponent={MaterialHeaderButton} >
    //           <Item
    //             title="search"
    //             iconName="search"
    //             onPress={() => alert('search')}
    //           />
    //           <OverflowMenu
    //             OverflowIcon={({ color }) => (
    //               <MaterialIcons name="more-horiz" size={23} color={color} />
    //             )}
    //           >
    //             <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
    //             <HiddenItem title="hidden2" onPress={() => alert('hidden2')} />
    //           </OverflowMenu>
    //         </HeaderButtons>
    //        </View>
    //       ),
    //     });
    //   }, [navigation]);


    return (
        <SafeAreaView edges={['right', 'bottom', 'left']} style={[styles.flex1, styles.column]} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100} style={styles.flex1}>
                <ChatBody chatUI={chatUI} />
                <ChatFooter message={message} handleSendMesssage={handleSendMesssage} chatUI={chatUI} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


