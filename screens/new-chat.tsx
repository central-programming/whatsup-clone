import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { HomeScreenProps } from "../types/navigator";
import ChatListHeaderRight from "../components/chat-list-header-right";
import { colors, styles } from "../styles/index";

export default function NewChatScreen({ navigation }: HomeScreenProps) {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <ChatListHeaderRight title="Close" iconName="close" color={colors.primary} handlePress={handlePress} />
            ),
            headerTitle: "New Chat",
        });
    }, []);

    const handlePress = () => {
        navigation.goBack();
    };
        


    return (
        <View style={[styles.flex1, styles.xCenter, styles.yCenter]}>
            <Text>New Chat</Text>
            {/* <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} /> */}
        </View>
    );
}

