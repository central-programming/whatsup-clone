import React from "react";
import { View, Text, Button } from "react-native";
import {useStoreActions} from '../state/hooks';
import PageTitle from "../components/page-title";
import PageContainer from "../components/page-container";

export default function SettingsScreen() {
    const clearUser = useStoreActions((actions) => actions.clearUser);
  
    return (
        <PageContainer>
            <PageTitle title="Settings" textAlignment="flex-start" />
            <Button title="Logout" onPress={() => {
                clearUser();
            }} />
        </PageContainer>
    );
}