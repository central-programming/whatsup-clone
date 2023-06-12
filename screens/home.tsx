import { View, Text, Button } from "react-native";
import { HomeScreenProps } from "../types/navigator";
import {styles } from "../styles/index";

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View style={[styles.flex1,styles.xCenter, styles.yCenter]}>
            <Text>Home Screen</Text>
            <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
        </View>
    );
}
