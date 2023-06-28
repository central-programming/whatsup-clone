import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { HomeScreenProps } from "../types/navigator";
import ChatListHeaderRight from "../components/chat-list-header-right";
import { styles } from "../styles/index";

export default function ChatListScreen({ navigation }: HomeScreenProps) {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ChatListHeaderRight color="blue" />
            ),
        });
    }, []);


    return (
        <View style={[styles.flex1, styles.xCenter, styles.yCenter]}>
            <Text>Home Screen</Text>
            <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
        </View>
    );
}

