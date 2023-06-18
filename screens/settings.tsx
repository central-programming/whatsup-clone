import React from "react";
import { View, Text, Button } from "react-native";
import {useStoreActions} from '../state/hooks';

export default function SettingsScreen() {
    const clearUser = useStoreActions((actions) => actions.clearUser);
  
    return (
        <View>
            <Text>Settings Screen</Text>
            <Button title="Logout" onPress={() => {
                clearUser();
            }} />
        </View>
    );
}