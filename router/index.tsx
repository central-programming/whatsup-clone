import { NavigationContainer, RouteProp } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChatListScreen from "../screens/chat";
import HomeScreen from "../screens/home";
import { RootStackParamList } from "../types/navigator";

const Stack = createStackNavigator<RootStackParamList>();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Chat" component={ChatListScreen} options={{
                    headerBackTitle: "Back",
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}