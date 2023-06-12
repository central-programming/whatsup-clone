import { View, Text, StyleSheet, Button } from "react-native";
import { HomeScreenProps } from "../types/navigator";

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center"
    },
});
  