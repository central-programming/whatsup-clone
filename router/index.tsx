import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigator";
import MainNavigation from "./main-navigation";

const Stack = createStackNavigator<RootStackParamList>();

export default function Router() {
    return (
        <NavigationContainer >
            <MainNavigation />
        </NavigationContainer>
    );
}