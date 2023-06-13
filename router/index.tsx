import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigator";
import MainNavigation from "./main-navigation";
import AuthScreen from "../screens/auth";
const Stack = createStackNavigator<RootStackParamList>();

export default function Router() {
    const isAuth = false;
    return (
        <NavigationContainer >
            {
                isAuth ? (<MainNavigation />) : (<AuthScreen />)
            }
            
        </NavigationContainer>
    );
}