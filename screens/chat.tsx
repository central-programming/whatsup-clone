import { View, Text, Button } from "react-native";
import { ChatScreenProps } from "../types/navigator";

export default function ChatListScreen({navigation}:ChatScreenProps) {
    return (
        <View>
            <Text>Chat Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}