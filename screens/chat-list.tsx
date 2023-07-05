import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { HomeScreenProps } from "../types/navigator";
import ChatListHeaderRight from "../components/chat-list-header-right";
import { colors, styles } from "../styles/index";
import { User } from "../types/user";

export default function ChatListScreen({ navigation }: HomeScreenProps) {
    
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ChatListHeaderRight title="Create new chat" iconName="create-outline" color={colors.primary} handlePress={handlePress} />
            ),
        });
    }, []);

    const handlePress = () => {
        navigation.navigate("NewChat");
    };
        


    return (
        <View style={[styles.flex1, styles.xCenter, styles.yCenter]}>
            <Text>Home Screen</Text>
            <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
        </View>
    );
}

