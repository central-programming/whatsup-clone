import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "../router/main-navigation";
import AuthScreen from "./auth";
import {useStoreState} from '../state/hooks';
import StartupScreen from "./startup";
import useRefreshTokenCheck from "../hooks/useRefreshTokenCheck";

export default function MainScreen() {
    const { isLoading, tokenIsValid } = useRefreshTokenCheck();
    const { token } = useStoreState((state) => state.auth);
    const isAuth = !!token || tokenIsValid;
  
    if (isLoading) {
      return <StartupScreen />;
    }
  
    if (isAuth) {
      return (
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      );
    }
  
    return <AuthScreen />;
  }